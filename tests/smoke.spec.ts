import { test, expect, type Page } from "@playwright/test";

function trackPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });
  return errors;
}

test.describe("Public navigation smoke tests", () => {
  test("home page renders and public nav links work", async ({ page }) => {
    const errors = trackPageErrors(page);

    await page.goto("/");
    await expect(page).toHaveTitle(/Talent Tuition Center/i);
    await expect(page.getByRole("link", { name: /Talent Tuition Center/i }).first()).toBeVisible();

    const routes = [
      { linkName: /About Us/i, url: /\/about$/ },
      { linkName: /Classes & Programs/i, url: /\/classes$/ },
      { linkName: /FAQ/i, url: /\/faq$/ },
      { linkName: /Contact & Location/i, url: /\/contact$/ },
      { linkName: /Portal (Login|Sign In)/i, url: /\/login$/ },
    ];

    for (const route of routes) {
      await page.getByRole("link", { name: route.linkName }).first().click();
      await expect(page).toHaveURL(route.url);
      await expect(page.locator("main")).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("unauthenticated /portal redirects to /login", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("Demo portal login smoke tests", () => {
  const demoAccounts = [
    {
      roleLabel: "Student",
      email: "aarav.sharma@gmail.com",
      password: "student123",
      expectedUser: "Aarav Sharma",
    },
    {
      roleLabel: "Teacher",
      email: "ananya.rao@gmail.com",
      password: "teacher123",
      expectedUser: "Ms. Ananya Rao",
    },
    {
      roleLabel: "Admin",
      email: "admin@talent.org",
      password: "admin123",
      expectedUser: "Center Administrator",
    },
  ] as const;

  for (const account of demoAccounts) {
    test(`${account.roleLabel} demo portal login succeeds`, async ({ page }) => {
      const errors = trackPageErrors(page);

      await page.goto("/login");
      await page.getByRole("button", { name: account.roleLabel, exact: true }).click();
      await page.getByPlaceholder("you@example.com").fill(account.email);
      await page.getByPlaceholder("••••••••").fill(account.password);
      await page.getByRole("button", { name: new RegExp(`Sign In as \\(${account.roleLabel}\\)`, "i") }).click();

      await expect(page).toHaveURL(/\/portal$/);
      await expect(page.getByText(account.expectedUser).first()).toBeVisible({ timeout: 15000 });

      expect(errors).toEqual([]);
    });
  }
});

