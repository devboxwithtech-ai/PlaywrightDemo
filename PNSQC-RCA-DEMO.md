# PNSQC Playwright RCA Demo

## RCA Context

**Affected area:** The test in [`src/tests/pnsqc.spec.ts`](src/tests/pnsqc.spec.ts) looks for a button named “Execute Verified Audit”; the page is [`tests/pnsqc.html`](tests/pnsqc.html).

The context agent identified a passing Allure result in commit `5348da3` at 12:22:39 -0700 and a subsequent label change in `43c0d19` at 12:23:48 -0700—about **69 seconds later**. The evidence indicates the pass came *before* the label change.

## RCA Evidence

The test failure reproduced at `http://127.0.0.1:5501/tests/pnsqc.html`: Playwright timed out trying to find “Execute Verified Audit.” The page exposes the button as “Execut Verified Audit.” Clicking with that displayed name sets the status to “QA Audit Passed!” A favicon 404 was also observed, but appears unrelated.

**Ranked hypotheses:**

1. **Deployment regression — 0.98:** The label change explains the locator timeout; the click works with the current label.
2. **Data/input anomaly — 0.10:** The expected and actual accessible names differ, though the commit history points to a recent change.
3. **Configuration drift — 0.04:** Possible expectation/runtime mismatch, but no configuration evidence.
4. **Dependency failure — 0.01:** No supporting evidence; the page and handler work.
5. **Resource exhaustion — 0.01:** No supporting evidence; the failure is explained by the name mismatch.
6. **Insufficient evidence — 0.01:** Deployment mechanics aren’t confirmed, but the immediate failure is well-supported.

## RCA Resolution

**Exact commit:** `43c0d19ee3f48ee4064b34979ac945aa027f11eb` (`injectissue`) changed the button label, leaving the test’s accessible-name locator out of sync.

**Proposed diff** — not applied:

```diff
-       Execut Verified Audit
+       Execute Verified Audit
```

**Change request draft**

- **Title:** Restore the verified audit button’s accessible name
- **Rationale:** Restore the button name expected by the Playwright test.
- **Evidence:** The test times out looking for “Execute Verified Audit”; the page currently shows “Execut Verified Audit.” Clicking the displayed name updates the status to “QA Audit Passed!”
- **Risk:** Low; it changes only the button text and accessible name.
- **Rollback plan:** Revert the one-line label change if it causes an unexpected regression.

No files were changed as part of the RCA, and no commit or PR was created.
