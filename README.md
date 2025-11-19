# SauceDemo Playwright Automation

This project is a **Playwright + TypeScript test automation suite** for the [SauceDemo](https://www.saucedemo.com/) web application. It uses **Page Object Model (POM)** design and demonstrates adding items to the cart and performing a checkout workflow.

---

## Table of Contents

* Prerequisites
* Installation
* Project Structure
* Running Tests
* Test Reports and Logs
* Notes for Beginners
* Additional Resources

---

## Prerequisites

Before running the tests, ensure you have:

1. **Node.js** (version 18 or higher) installed:

   ```bash
   node -v
   ```
2. **npm** (comes with Node.js):

   ```bash
   npm -v
   ```
3. **Git** (optional, if cloning from GitHub):

   ```bash
   git --version
   ```

---

## Installation

1. **Clone the repository** (if not already):

   ```bash
   git clone https://github.com/sagar9950/saucedemo.git
   cd saucedemo
   ```

2. **Install project dependencies**:

   ```bash
   npm install
   ```

3. **Install Playwright browsers** (Chromium, Firefox, WebKit):

   ```bash
   npx playwright install
   ```

> ✅ This will download the necessary browser binaries needed for tests.

---

## Project Structure

```
saucedemo/
│
├─ tests/                  # Test specs
│  └─ saucedemo.spec.ts
│
├─ poms/                   # Page Object Models
│  ├─ login.ts
│  ├─ cart.ts
│  └─ swag-labs.ts
│
├─ shared/                 # Shared utilities (shopping cart helper)
│  └─ shopping-cart.ts
│
├─ playwright.config.ts    # Playwright configuration (browsers, parallelism, reports)
├─ package.json            # Project dependencies and scripts
└─ README.md
```

---

## Running Tests

### 1. Run all tests

```bash
npx playwright test
```

* Runs tests on all configured browsers (Chromium, Firefox, WebKit).
* Tests will execute in parallel locally.

### 2. Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 3. Run a specific test file

```bash
npx playwright test tests/saucedemo.spec.ts
```

### 4. Open Playwright Test Runner GUI

```bash
npx playwright test --ui
```

* Useful for beginners to run/debug tests interactively.

---

## Test Reports and Logs

After running tests:

1. **HTML Report**:

```bash
npx playwright show-report
```

* Opens a detailed report in your default browser.
* Includes test results, screenshots, and trace links for each test.

2. **Test Artifacts Directory**:

By default, Playwright stores artifacts such as:

* **Screenshots** of failures → `test-results/` folder (inside project root).
* **Traces** for debugging failed tests → `test-results/` folder (`trace.zip` files).
* **Videos** (if enabled) → `test-results/` folder.

Example structure after a run:

```
saucedemo/
├─ test-results/
│  ├─ chromium-2025-11-19_15-30-12/
│  │  ├─ trace.zip
│  │  ├─ screenshot-*.png
│  │  └─ test-results.json
│  └─ firefox-2025-11-19_15-30-13/
```

3. **Logging during tests**:

* `console.log()` statements inside page objects will print directly to your terminal during test execution.

---

## Notes for Beginners

1. **Page Object Model (POM)**:

   * Each page (Login, Inventory, Cart) has a corresponding class in `poms/`.
   * Methods like `login()` or `AddItem()` encapsulate actions and assertions.

2. **Assertions**:

   * Playwright uses `expect()` to validate the state of the page (URLs, text, counts).
   * If an assertion fails, the test stops and reports the failure.

3. **Tracing / Debugging**:

   * Playwright can capture traces on retry (`trace: 'on-first-retry'`) to visually see what happened.
   * Use `npx playwright show-trace <trace.zip>` to inspect.

4. **Explicit Waits**:

   * Sometimes an explicit wait like `await page.waitForTimeout(5000)` is used to handle slower page loads.
   * Prefer Playwright’s built-in auto-waiting whenever possible.

---

## Additional Resources

* [Playwright Documentation](https://playwright.dev/docs/intro)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/)
* [SauceDemo Website](https://www.saucedemo.com/)

---

*This README provides a beginner-friendly guide for setup, execution, and locating test results/logs for the SauceDemo Playwright project.*
