import { test, expect } from '@playwright/test';

test.describe('Sculpt Your Space — Interactive 3D Portfolio Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to root and wait for 3D loading overlay to clear
    await page.goto('/');
    await page.locator('text=100%').waitFor({ state: 'hidden', timeout: 15000 });
  });

  test('should load home page and display hero section with 3D profile card and CTAs', async ({ page }) => {
    // Verify document title
    await expect(page).toHaveTitle(/Sculpt Your Space/i);

    // Verify main hero title "Srajal Puri"
    const heroTitle = page.locator('h1:has-text("Srajal Puri")');
    await expect(heroTitle).toBeVisible({ timeout: 10000 });

    // Verify 3D Profile Card technical metadata & name
    const profileCard = page.locator('text=01 / PROFILE');
    await expect(profileCard).toBeVisible();

    const collegeDetail = page.locator('text=Dr. D. Y. Patil School of Science and Technology');
    await expect(collegeDetail).toBeVisible();

    // Verify CTA buttons exist
    const exploreBtn = page.locator('a:has-text("Explore My Work")');
    await expect(exploreBtn).toBeVisible();

    const connectBtn = page.locator('a:has-text("Let\'s Connect")');
    await expect(connectBtn).toBeVisible();
  });

  test('should navigate to Projects section and open Case Study Modal', async ({ page }) => {
    // Click Projects navigation link
    const projectsLink = page.locator('header nav a:has-text("PROJECTS")').first();
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();

    // Verify Featured Projects heading
    const projectsHeading = page.locator('#projects h2:has-text("Featured Projects")');
    await expect(projectsHeading).toBeVisible();

    // Open first project case study modal
    const caseStudyBtn = page.locator('button:has-text("Case Study")').first();
    await expect(caseStudyBtn).toBeVisible();
    await caseStudyBtn.click();

    // Verify modal appears with dialog role
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    // Close modal via Close button
    const closeBtn = page.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).toBeHidden();
  });

  test('should filter technology skills in skills matrix', async ({ page }) => {
    // Click Skills link
    const skillsLink = page.locator('header nav a:has-text("SKILLS")').first();
    await skillsLink.click();

    // Verify Skills heading
    const skillsHeading = page.locator('#skills h2:has-text("Skills & Capabilities")');
    await expect(skillsHeading).toBeVisible();

    // Click 3D & WebGL filter button
    const filterBtn = page.locator('button:has-text("3D & WebGL")');
    await filterBtn.click();

    // Verify Three.js card is present
    const threeCard = page.locator('h3:has-text("Three.js")');
    await expect(threeCard).toBeVisible();
  });
});
