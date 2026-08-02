import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const htmlRoutes = [
  "/",
  "/404.html",
  "/cookies.html",
  "/demo-cafe.html",
  "/demo-roofing.html",
  "/demo-salon.html",
  "/legal.html",
  "/maintenance.html",
  "/preview.html",
  "/privacy.html",
  "/share.html",
  "/start-project.html",
  "/terms.html"
];

const axeTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

function formatViolations(violations) {
  return violations
    .map(
      (violation) =>
        `${violation.id}: ${violation.help}\n${violation.nodes
          .map((node) => `  ${node.target.join(" ")} - ${node.failureSummary}`)
          .join("\n")}`
    )
    .join("\n\n");
}

async function expectNoAxeViolations(page) {
  // Contrast is measured after the short entry animation reaches its final, fully opaque state.
  await page.waitForTimeout(1_000);
  const result = await new AxeBuilder({ page }).withTags(axeTags).analyze();
  expect(result.violations, formatViolations(result.violations)).toEqual([]);
}

test("homepage has no automated WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expectNoAxeViolations(page);
});

test("small brass labels retain WCAG AA contrast on white surfaces", async ({ page }) => {
  await page.goto("/");

  for (const label of [page.locator(".process-list article span").first(), page.locator(".popular").first()]) {
    const contrast = await label.evaluate((element) => {
      const values = getComputedStyle(element).color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
      if (!values || values.length !== 3) return 0;

      const luminance = values
        .map((value) => value / 255)
        .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
        .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);

      return 1.05 / (luminance + 0.05);
    });

    expect(contrast).toBeGreaterThanOrEqual(4.5);
  }
});

test("skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("mobile navigation communicates state and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile navigation is only shown at narrow widths.");
  await page.goto("/");
  const toggle = page.locator("[data-nav-toggle]");
  await expect(toggle).toHaveAccessibleName("Open navigation");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveAccessibleName("Close navigation");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveAccessibleName("Open navigation");
  await expect(toggle).toBeFocused();
});

test("supporting pages and local resources remain reachable", async ({ page, request }, testInfo) => {
  test.setTimeout(120_000);
  test.skip(testInfo.project.name !== "desktop-chromium", "One desktop crawl covers the shared files.");

  const checkedResources = new Set();

  for (const route of htmlRoutes) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} should load successfully`).toBeTruthy();
    await expectNoAxeViolations(page);

    const urls = await page.locator("a[href], img[src], script[src], link[href]").evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute("href") || element.getAttribute("src"))
        .filter(Boolean)
    );

    for (const rawUrl of urls) {
      if (/^(?:mailto:|tel:|data:|javascript:)/i.test(rawUrl) || rawUrl.startsWith("#")) continue;
      const url = new URL(rawUrl, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      url.hash = "";
      if (checkedResources.has(url.href)) continue;
      checkedResources.add(url.href);
      const resourceResponse = await request.head(url.href);
      expect(resourceResponse.ok(), `${url.pathname} should not be a broken local resource`).toBeTruthy();
    }
  }
});
