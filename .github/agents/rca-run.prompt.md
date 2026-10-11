---
description: Run the 3-agent RCA chain (Context → Evidence → Resolution) on the failing pnsqc test
agent: agent
---
The Playwright test in src/tests/pnsqc.spec.ts is failing.
Site under test: http://127.0.0.1:5501/tests/pnsqc.html

Run these three agents in order. Show each result under its own heading, and pass each
agent's output to the next one.

1. **RCA Context** (rca-context): using only git history, find what changed since the last
   passing point. Return the affected area, time window, and recent commits.

2. **RCA Evidence** (rca-evidence): using that context, reproduce the failure with Playwright
   against the site above. Cluster the errors, and rank hypotheses from the fixed taxonomy
   (deployment regression, dependency failure, configuration drift, resource exhaustion,
   data/input anomaly, or insufficient evidence) with a confidence score and evidence for each.

3. **RCA Resolution** (rca-resolution): take the top-ranked hypothesis, identify the exact commit
   behind it, propose the fix as a diff, and draft the change request (title, rationale,
   evidence, risk, rollback plan).

If you can call these as sub-agents, call each one by the names above. Otherwise follow each
agent's instructions yourself, in order. Do not skip any stage.

Rules: do not edit files, commit, push, or create PRs. Propose only. A human approves.