# Tiny Library custom-agent workflow

These repository-level agents are designed to run in sequence:

1. **`tiny-library-planner`** - researches the request and produces an implementation-ready design.
2. **`tiny-library-implementer`** - applies the approved plan and runs the relevant checks.
3. **`tiny-library-reviewer`** - reviews the diff for correctness, regressions, accessibility, and maintainability.
4. **`tiny-library-security`** - performs a separate read-only security review.

Pass each agent's handoff to the next agent. The planner and implementer should be used first; reviewer and security analysis should run after implementation. Findings from the reviewer or security agent should be fixed by returning to `tiny-library-implementer`, followed by another targeted review.

All agents inherit the repository's shared instructions. The profiles add role-specific behavior and do not replace `AGENTS.md` or `.github/copilot-instructions.md`.
