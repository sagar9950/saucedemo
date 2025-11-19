# Decision Log - Saucedemo

This document outlines the decision log for the SauceDemo Playwright automation project prepared as part of the assessment.

---

## 1. Scope Interpretation and Time Taken
- The project covers an end-to-end test of SauceDemo including login, adding items to the cart, verifying cart contents, and starting the checkout process.
- The work took longer than initially expected and was not strictly timeboxed.

## 2. Test Selection and Coverage Rationale
- Core E2E scenario tested: login → inventory → cart → checkout.
- Focused on key user flows for an online shopping experience.
- Validations include URL checks, cart item counts, and price verification to ensure correct behavior.

## 3. Stability and Data Strategies
- Used stable test credentials (`standard_user` / `secret_sauce`) to avoid login flakiness.
- Dynamic locators for cart items ensure tests are resilient to changes in UI order.
- Minimized explicit waits, relying on Playwright auto-waiting to improve stability.

## 4. Project Structure Decisions
- **Page Object Model (POM):** separated `LoginPage`, `SwagLabs`, and `Cart` classes for modularity.
- **Shared utility:** `ShoppingCart` handles cart icon interactions to reduce code duplication.
- `tests/` folder contains the main test spec, separating framework from test logic.
- `playwright.config.ts` centralizes configuration for browsers, retries, parallelism, and reporting.

## 5. Next Steps if Given More Time
- Add negative test cases (e.g., invalid login, out-of-stock items).
- Integrate with CI/CD for automated test execution.
- Introduce data-driven tests using JSON/CSV.
- Enhance reporting with failure screenshots and video captures.
- Extend coverage to checkout completion and payment simulations.
- Add environment configuration (`.env`) for test credentials and URLs.

---

*End of Decision Log*
