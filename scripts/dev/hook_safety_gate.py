#!/usr/bin/env python3
"""
[WHAT]
Antigravity PreToolUse Lifecycle Hook — Destructive Command Interceptor & Read Fast-Path.

[WHY]
Acts as an automated safety guard before shell execution: allows safe inspection
commands immediately and asks for confirmation on destructive commands outside tmp/.
"""

import json
import re
import sys
from typing import Any, Dict

DESTRUCTIVE_PATTERNS = [
    (re.compile(r"""\bgit\s+reset\s+--hard\b""", re.IGNORECASE), "git reset --hard will discard uncommitted changes"),
    (re.compile(r"""\bgit\s+clean\s+-[a-zA-Z]*f""", re.IGNORECASE), "git clean will permanently delete untracked files"),
    (re.compile(r"""\bgit\s+branch\s+-[a-zA-Z]*D\b""", re.IGNORECASE), "git branch -D will force-delete an unmerged branch"),
    (re.compile(r"""\bgit\s+push\s+.*(?:--force|-f\b)""", re.IGNORECASE), "git force-push will overwrite remote branch history"),
    (re.compile(r"""\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\s+(?!\s*tmp\/|\s*workspace\/tmp)""", re.IGNORECASE), "rm -rf outside tmp/ can cause unrecoverable data loss"),
    (re.compile(r"""\b(?:ssh|scp)\s+""", re.IGNORECASE), "direct remote SSH/SCP command requires human confirmation"),
]

SAFE_READ_COMMANDS = (
    "cd", "ls", "tree", "cat", "head", "tail", "grep", "rg", "find",
    "pwd", "stat", "file", "which", "whereis", "type", "echo", "printf",
    "git status", "git log", "git diff", "git show", "git branch",
    "python3 --version", "python --version",
)


def evaluate_hook(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Evaluate PreToolUse payload and return allow or ask decision."""
    tool_call = payload.get("toolCall", {})
    tool_name = tool_call.get("name", "")
    args = tool_call.get("args", {})

    if tool_name in {"run_command", "bash", "execute_command"}:
        cmd = (args.get("CommandLine", "") or args.get("command", "")).strip()

        for pattern, warning in DESTRUCTIVE_PATTERNS:
            if pattern.search(cmd):
                return {
                    "decision": "ask",
                    "reason": f"Destructive command detected: {warning}. Command: '{cmd}'.",
                }

        for safe_cmd in SAFE_READ_COMMANDS:
            if cmd == safe_cmd or cmd.startswith(f"{safe_cmd} "):
                return {"decision": "allow"}

    return {"decision": "allow"}


def main() -> None:
    if len(sys.argv) > 1 and sys.argv[1] in {"-h", "--help"}:
        print("Antigravity PreToolUse Safety Gate Hook")
        sys.exit(0)

    try:
        input_data = sys.stdin.read().strip()
        if not input_data:
            print(json.dumps({"decision": "allow"}))
            sys.exit(0)

        payload = json.loads(input_data)
        print(json.dumps(evaluate_hook(payload)))
    except Exception as err:
        print(json.dumps({"decision": "allow", "reason": f"Hook fallback: {err}"}))
        sys.exit(0)


if __name__ == "__main__":
    main()
