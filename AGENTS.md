<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Global Execution Policy

## Terminal & Shell Rules

- Run non-blocking commands efficiently.
- Avoid running long-lived background processes unless requested.
- Inspect test failures and build outputs directly from stdout/stderr.

## Codebase Hygiene

- Keep diffs surgical and minimal.
- Do not modify whitespace, imports, or adjacent logic unrelated to the targeted change.
- Never strip existing comments or inline documentation unless explicitly refactoring that code.

## Ui/Ux

When user requests UI/UX work (design, build, create, implement, review, fix, 
improve), defer to the UI/UX Pro Max workflow by automatically running:  
 python3 .agent/.shared/ui-ux-pro-max/scripts/search.py --design-system -p  
 "<Project Name>" -f markdown

# Gemini Free-Tier Efficiency Protocol

## Token & Turn Discipline

- **Batching:** Consolidate multiple file changes into a  
  single `edit` call with multiple entries. Never use separate  
  turns for related modifications.
  
- **Terseness:** Omit all conversational preamble, status  
  updates, and postambles. Start responses directly with tool  
  calls or code.
  
- **Raw Utility:** Prioritize high signal-to-noise ratio. If  
  a task can be explained in 5 words or 50, use 5.
  
  - Max-Payload Turns: Aim to solve the entire user prompt in  
    exactly one turn. Do not ask for "permission to proceed"  
    between sub-steps of a single task; execute the full sequence 
    immediately.
  
  ## Context Window Optimization
  
- **Targeted Reading:** Use `bash` (grep, sed, head/tail) to  
  inspect specific code regions instead of `read`-ing entire  
  large files.
  
- **Minimal Diffs:** Keep `edits[].oldText` as small as  
  possible to minimize context bloat while maintaining  
  uniqueness.
  
- **Atomic Slices:** Break complex features into vertical  
  slices that can be completed in 1-2 turns.
  
  ## Local Intelligence Offloading
  
- **Local Verification:** Always run `npm run lint`, `tsc`,  
  or tests locally via `bash` before declaring a task done to  
  prevent "fix-up" turns.
  
- **Scripted Thinking:** Write local scripts (Bash/Node) to  
  handle repetitive file operations or data transformations  
  instead of processing them via the prompt.