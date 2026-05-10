// @ts-check
const { test, expect } = require("@playwright/test");

const SMOKE_IMPORT_URL =
  process.env.PLATELY_SMOKE_IMPORT_URL ||
  "https://www.lekkerensimpel.com/pasta-alfredo-met-kip/";

test.describe("Plately smoke", () => {
  test("GET /api/health responds", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
  });

  test("POST /api/import returns a usable recipe payload", async ({ request }) => {
    test.setTimeout(150_000);
    const res = await request.post("/api/import", {
      data: { url: SMOKE_IMPORT_URL },
    });
    const body = await res.json();
    if (!res.ok()) {
      // eslint-disable-next-line no-console
      console.error("import failed", res.status(), JSON.stringify(body).slice(0, 800));
    }
    expect(res.ok(), body?.message || JSON.stringify(body)).toBeTruthy();
    expect(body?.recipe?.title, JSON.stringify(body)).toBeTruthy();
    expect(Array.isArray(body.recipe.ingredients)).toBeTruthy();
    expect(body.recipe.ingredients.length).toBeGreaterThan(1);
  });

  test("home screen shows import entry", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Sla een recept op/i })).toBeVisible();
    await expect(page.locator("#homeImportUrl")).toBeVisible();
  });
});
