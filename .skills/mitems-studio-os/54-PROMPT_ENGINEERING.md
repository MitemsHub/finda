# 54 — Prompt Engineering

### The Craft of Instructing AI Well

> *"A prompt is a specification written in prose. Vague spec, vague result. The skill isn't magic words — it's the same clarity, context, and constraints you'd give a brilliant new hire on their first day."*

---

**Chapter type:** Extended Capability (Operations & Craft)
**DRI:** AI Systems Designer + discipline leads
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`53`](./53-AI_COLLABORATION_PROTOCOL.md), [`32`](./32-TYPESCRIPT_GUIDE.md), [`43`](./43-CLEAN_CODE.md)
**Feeds:** every chapter's "AI Implementation Guidance" + "Prompt example" sections

---

## Table of Contents
1. [Purpose](#1-purpose)
2. [Philosophy](#2-philosophy)
3. [Principles](#3-principles)
4. [Best Practices](#4-best-practices)
5. [Anti-Patterns](#5-anti-patterns)
6. [Real-World Examples](#6-real-world-examples)
7. [Common Mistakes](#7-common-mistakes)
8. [AI Implementation Guidance](#8-ai-implementation-guidance)
9. [Human Review Checklist](#9-human-review-checklist)
10. [Automation Opportunities](#10-automation-opportunities)
11. [References for Further Study](#11-references-for-further-study)
12. [Review Checklist & Measurable Quality Criteria](#12-review-checklist--measurable-quality-criteria)

---

## 1. Purpose

This chapter defines how the studio **writes effective prompts** — the craft of instructing AI agents to produce high-quality, on-target, verifiable work. It's the practical companion to the AI Collaboration Protocol ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)): where 53 defines *the workflow and accountability*, this chapter defines *how to write the instruction* that makes the workflow succeed — the reusable prompt scaffolds, patterns, and techniques used throughout the manual (every chapter's "Prompt example" is an application of this).

Because a vague prompt is a human failure ([`53`](./53-AI_COLLABORATION_PROTOCOL.md), Article XI), prompt engineering is a core studio skill, not a novelty. This chapter turns it into a *repeatable discipline* — a shared, versioned library of scaffolds so that instructing AI is consistent, effective, and improvable ([`50`](./50-CONTINUOUS_IMPROVEMENT.md)), rather than each person rediscovering "magic words."

---

## 2. Philosophy

**A prompt is a specification, and specs live or die on clarity, context, and constraints.** The mystique of "prompt engineering" as secret incantations is mostly wrong. An agent is a capable, fast, literal collaborator that knows only what you tell it ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)). Instructing it well is the same skill as writing a good ticket or briefing a talented new hire: say clearly *what you want*, give the *context* they need, state the *constraints* and *definition of done*, and show an *example* of "good." Vagueness in → vagueness out; the fix is precision, not tricks.

**Show the boundaries, not just the goal — constraints are what make output usable.** The single biggest quality lever after clarity is *constraints*. "Build a login form" yields something generic; "build a login form bound by chapters 13 + 22 + 38: associated labels, generic non-enumerating errors, `HttpOnly` cookies, WCAG AA, argon2 hashing" yields something *correct*. Constraints (the floor, budgets, conventions, which chapters apply) are how you get output that fits *this* studio's bar rather than the internet's average (Article III, VIII).

**Structure beats prose; examples beat description.** Agents follow *structured* instructions (roles, sections, checklists, output formats) more reliably than a wall of prose, and they match *examples* better than they match adjectives. "Make it clean" is weak; a short before/after example of the studio's clean-code style ([`43`](./43-CLEAN_CODE.md)) is strong. The scaffolds in this manual are structured on purpose — role, scope, context, constraints, DoD, output, protocol — because structure + examples are what make results consistent.

**Prompts are reusable, versioned assets — build a library, not one-offs.** The best prompts are worth keeping. A scaffold that reliably produces good accessible components, or a good security audit, should be *saved, shared, and improved* — not retyped from memory each time (and degraded each time). The studio treats effective prompts as a versioned library ([`52`](./52-DESIGN_OPS.md)-style governance, [`50`](./50-CONTINUOUS_IMPROVEMENT.md) improvement), so instructing AI compounds in quality rather than resetting to zero with each person and each task.

---

## 3. Principles

### Principle 1 — Clarity, context, constraints, definition-of-done
Every prompt states the goal clearly, gives needed context, sets constraints, and defines "done."
> *Rationale ([`53`](./53-AI_COLLABORATION_PROTOCOL.md) P4):* Vague prompt = human failure.

### Principle 2 — Assign a role + bind the Constitution and relevant chapters
"You are the {specialist}, bound by 00-CONSTITUTION + {chapters}."
> *Rationale (Art. XI, [`53`](./53-AI_COLLABORATION_PROTOCOL.md)):* Role + rules focus + constrain the output.

### Principle 3 — Constraints (esp. the floor) are explicit, not assumed
State a11y/security/data-safety, budgets, conventions — don't hope the agent infers them.
> *Rationale (Art. III):* The floor must be in the instruction.

### Principle 4 — Structure the prompt; specify the output format
Use sections/roles/checklists; say exactly what form the answer should take.
> *Rationale:* Structured input + defined output = reliable, usable results.

### Principle 5 — Show examples of "good" (and "bad")
Demonstrate the target quality/style; contrast with anti-patterns where useful.
> *Rationale:* Examples beat adjectives; agents pattern-match.

### Principle 6 — Require self-review + citation (tie to the protocol)
Ask the agent to self-check against the chapter's checklist and cite what it applied ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)).
> *Rationale (Art. XI):* Reviewable, calibratable output.

### Principle 7 — Forbid fabrication; invite "I don't know" + questions
Tell the agent to flag uncertainty/conflicts and ask when scope is unclear, never to invent.
> *Rationale (Art. X):* Hallucination is the defining risk.

### Principle 8 — Iterate + decompose; treat prompting as refinement
Break big asks into steps; refine the prompt based on output (it's a loop, not one shot).
> *Rationale (Art. IX):* Small, correctable steps.

### Principle 9 — Save + version effective prompts; improve them
Keep a shared, versioned prompt library; improve from outcomes ([`50`](./50-CONTINUOUS_IMPROVEMENT.md)).
> *Rationale ([`52`](./52-DESIGN_OPS.md), [`50`](./50-CONTINUOUS_IMPROVEMENT.md)):* Reusable assets compound.

---

## 4. Best Practices

### 4.1 The studio delegation scaffold (the canonical structure)
Every task-delegation prompt in this manual follows this shape (from [`53`](./53-AI_COLLABORATION_PROTOCOL.md) §8.3):
```
ROLE: You are the {discipline} specialist, bound by 00-CONSTITUTION + {relevant chapters}.
SCOPE: {the specific, bounded deliverable — not "the whole app"}
CONTEXT: {which chapters apply} + {relevant code/design/data} + {the user outcome served (Art. I)}
CONSTRAINTS: {the floor: a11y AA / security / data-safety} + {budgets, e.g. perf 35} + {conventions 42/43}
DEFINITION OF DONE: passes {chapter}'s Human Review Checklist; {measurable evidence required}
OUTPUT FORMAT: {files / diff / doc / table}
EXAMPLE (optional): {a short "good" sample of the target style}
PROTOCOL: work in small steps; self-review against the checklist; submit with the preamble
  (APPLIED / FLOOR CHECK / TRADE-OFFS / SELF-REVIEW / GAPS); ask if scope is unclear; do NOT fabricate.
```
> This is *the* pattern behind every "Prompt example" across the manual — memorize it.

### 4.2 The anatomy, expanded
| Element | Why it matters | Weak → Strong |
| --- | --- | --- |
| **Role** | Focuses knowledge + tone | "help me" → "You are the Accessibility Specialist" |
| **Scope** | Bounds the work | "build the app" → "build the login form only" |
| **Context** | Agent knows only what's given | (none) → "chapters 13/22/38; here's the design + the User model" |
| **Constraints** | Gets *studio-quality*, not average | (none) → "WCAG AA; generic errors; HttpOnly cookies; perf budget" |
| **DoD** | Defines success | "make it good" → "passes ch.13 checklist; tests + a11y pass" |
| **Output format** | Usable result | (freeform) → "a diff + a table of states" |
| **Example** | Beats adjectives | "clean code" → a before/after snippet ([`43`](./43-CLEAN_CODE.md)) |
| **Protocol** | Reviewable + safe | (none) → "self-review + cite + preamble + no fabrication" ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)) |

### 4.3 Core techniques
- **Role prompting:** assign the specialist persona (Principle 2) — sharpens relevance and standards.
- **Few-shot (examples):** show 1–3 examples of input→desired-output; the fastest way to convey style/format (Principle 5).
- **Chain-of-thought / "think step by step":** for complex reasoning, ask the agent to reason before answering (improves correctness on hard problems); for structured tasks, ask for a plan first.
- **Decomposition:** break a large task into a sequence of smaller prompts (Principle 8) — mirrors small reversible steps (Art. IX).
- **Output constraints:** specify format (JSON/table/diff), length, and structure explicitly (Principle 4).
- **Negative constraints:** state what *not* to do ("no `any`", "no dark patterns", "don't fabricate") — often as important as the positive ask.
- **Self-consistency / self-review:** ask the agent to check its own work against criteria before finalizing (Principle 6).

### 4.4 Delegation vs. audit prompts (the two workhorses)
Nearly every chapter provides both — reuse the shapes:
- **Delegation (build):** the scaffold in 4.1 — produce something to spec.
- **Audit (review):** `"Audit {artifact} for {specific anti-patterns from the chapter}. Output {location, issue, severity, fix}, prioritized by {floor/impact}. Flag {blockers}."` — find problems against a checklist.

### 4.5 Managing context (give enough, not everything)
- Include the **relevant** code/design/data and **which chapters apply** — not the entire codebase (noise dilutes focus + wastes the context window).
- For long tasks, **summarize prior context** and restate constraints (agents "forget" across long interactions).
- Point to the **source of truth** (this manual, the tokens, the schema) rather than pasting stale copies.

### 4.6 Iterate and refine (Principle 8)
Prompting is a loop: prompt → inspect output → identify the gap → refine the prompt (add the missing constraint/context/example) → repeat. When output is off, first ask *"what did I fail to specify?"* ([`53`](./53-AI_COLLABORATION_PROTOCOL.md) P4) before blaming the model. Save the *refined* version to the library (Principle 9).

### 4.7 Bake in the floor + no-fabrication (Principles 3, 7)
Because the floor (Art. III) and honesty (Art. X) are non-negotiable, put them in *every* build/audit prompt: the applicable floor constraints (a11y/security/data-safety), and an explicit **"do not fabricate; flag uncertainty; ask if unclear."** Don't rely on the agent to remember the manual — cite the chapters *and* restate the critical constraints.

### 4.8 The prompt library (Principle 9, [`52`](./52-DESIGN_OPS.md), [`50`](./50-CONTINUOUS_IMPROVEMENT.md))
Keep a **versioned, shared library** of proven scaffolds (per discipline/task), each with: what it's for, the scaffold, an example result, and a changelog. Govern it like the design system ([`52`](./52-DESIGN_OPS.md)) — owned, improved from outcomes ([`50`](./50-CONTINUOUS_IMPROVEMENT.md)), so instructing AI compounds in quality across the studio.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Vague, one-line prompts** ("make it better") | Generic, off-target output. | P1 |
| **No role / no chapter binding** | Unfocused; ignores studio standards. | P2 |
| **Assuming the floor** (a11y/security unstated) | Agent ships average, not studio-quality. | P3 |
| **Unstructured wall-of-prose prompt** | Agent misses buried requirements. | P4 |
| **Adjectives instead of examples** ("clean", "modern") | Under-specified; inconsistent. | P5 |
| **No self-review/citation requested** | Un-reviewable, un-calibratable output. | P6, [`53`](./53-AI_COLLABORATION_PROTOCOL.md) |
| **Not forbidding fabrication** | Hallucinated facts/data ship. | P7, Art. X |
| **One giant prompt** for a huge task | Overwhelmed; low quality; opaque. | P8 |
| **Dumping the whole codebase** as context | Noise dilutes focus; wastes window. | 4.5 |
| **Blaming the model** for a vague prompt | Misdiagnoses a human failure. | P1, [`53`](./53-AI_COLLABORATION_PROTOCOL.md) |
| **Retyping prompts from memory** each time | No compounding; quality resets/degrades. | P9 |
| **"Magic word" superstition** | Chasing tricks over clarity/context. | P1 |

---

## 6. Real-World Examples

### Example A — Vague vs. specified (same task, opposite results)
**Weak:** *"Build a login form."* → a generic form: placeholder-as-label, `localStorage` token, "no such user" errors — off the studio bar on every axis. **Strong (the scaffold, 4.1):** *"You are the Accessibility + Security specialist, bound by 00-CONSTITUTION + 13/22/38. Build a login form. Constraints: associated visible labels; generic non-enumerating errors; HttpOnly+Secure+SameSite cookies; WCAG AA; correct autocomplete; allow paste. DoD: passes ch.13 + ch.38 checklists. Output: TSX + a11y/security self-check preamble. Don't fabricate; flag uncertainty."* → correct, studio-quality output. *Same model, same task — the difference was the prompt (Principles 1–3, 6, 7).*

### Example B — Example beat the adjective
Asking for *"clean, well-structured code"* produced code the reviewer still found messy — "clean" is subjective. Adding a **short before/after example** of the studio's clean-code style ([`43`](./43-CLEAN_CODE.md): intent-revealing names, small functions, guard clauses, no magic numbers) made the agent match it precisely. *Examples beat adjectives — agents pattern-match (Principle 5).*

### Example C — The library compounded quality
Each engineer wrote their own ad-hoc "audit this for accessibility" prompt, with varying results. Capturing one **excellent, versioned a11y-audit scaffold** in the shared prompt library ([`52`](./52-DESIGN_OPS.md)/[`50`](./50-CONTINUOUS_IMPROVEMENT.md), 4.8) — mapped to chapter 22's anti-patterns, with output format + severity — meant *everyone* got the good result, and the scaffold *improved over time* from outcomes. *Prompts are reusable assets; a library compounds, retyping-from-memory resets (Principle 9).*

---

## 7. Common Mistakes

- **One-line vague prompts** and then blaming the model.
- **Omitting role / chapter binding / the floor** from the instruction.
- **Using adjectives** ("clean/modern/good") instead of examples + constraints.
- **Unstructured prompts** that bury requirements in prose.
- **Not asking for self-review/citation** or **not forbidding fabrication.**
- **One massive prompt** instead of decomposing.
- **Over-stuffing context** (whole codebase) — noise over signal.
- **Chasing "magic words"** instead of clarity/context/constraints.
- **Never saving/versioning** effective prompts (no compounding).

---

## 8. AI Implementation Guidance

*(Meta: how agents help with prompting itself, and how they should treat the prompts they receive.)*

### 8.1 Where agents help
- **Improve/refine prompts:** given a vague ask + goal, rewrite it into the studio scaffold (role/scope/context/constraints/DoD/output/protocol).
- **Generate audit + delegation prompts** for a given chapter's anti-patterns/checklist.
- **Maintain the prompt library:** propose new scaffolds, improve existing ones from observed outcomes ([`50`](./50-CONTINUOUS_IMPROVEMENT.md)).
- **Diagnose bad output:** identify which prompt element was missing (usually context/constraints/DoD) and fix the prompt, not just the output ([`53`](./53-AI_COLLABORATION_PROTOCOL.md) P4).

### 8.2 Hard rules (Art. XI, X, III)
- When a received prompt is **missing scope/context/constraints**, the agent **asks** (or states its assumptions explicitly) rather than guessing ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)).
- The agent still applies the **Constitution + relevant chapters + the floor even if the prompt omits them** — a weak prompt never lowers the studio bar (Art. III); it notes what it added.
- It **never fabricates** to satisfy an under-specified prompt; it flags the gap (Art. X).
- Generated prompts it produces **include the floor + no-fabrication + self-review/citation** clauses by default ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)).
- It treats effective prompts as **reusable, versioned assets** to save/improve, not one-offs (Principle 9).

### 8.3 Prompt example — improve a prompt (meta)
```
ROLE: Prompt engineer, bound by 00-CONSTITUTION + 54 (+53).
INPUT: a rough request: "{the user's vague ask}" + goal: "{what they actually want}".
TASK: Rewrite it into the studio delegation scaffold: ROLE (specialist + chapter binding),
  SCOPE, CONTEXT (which chapters/data apply + user outcome), CONSTRAINTS (floor + budgets + conventions),
  DEFINITION OF DONE (checklist + evidence), OUTPUT FORMAT, optional EXAMPLE, and PROTOCOL
  (self-review + citation + preamble + no fabrication). Fill gaps with sensible defaults and MARK them
  as assumptions to confirm.
OUTPUT: the improved prompt + a note on what was missing in the original.
```

### 8.4 Prompt example — generate an audit prompt for any chapter
```
TASK: Given chapter {NN}, generate a reusable AUDIT prompt: bind 00-CONSTITUTION + {NN}; list the
chapter's specific anti-patterns to detect; specify output {location, issue, severity, fix} prioritized
by floor/impact; and instruct to flag blockers + not fabricate. Format it for the shared prompt library.
```

---

## 9. Human Review Checklist

- [ ] The prompt states **clear scope, context, constraints, and a definition of done** (not vague).
- [ ] It assigns a **role** and **binds the Constitution + relevant chapters**.
- [ ] The **floor** (a11y/security/data-safety) + any budgets/conventions are **explicit**, not assumed.
- [ ] It's **structured** and specifies the **output format**; includes an **example** where quality/style matters.
- [ ] It requires **self-review + citation** and **forbids fabrication** (invites "I don't know" + questions) ([`53`](./53-AI_COLLABORATION_PROTOCOL.md), Art. X).
- [ ] Large tasks are **decomposed**; context is **relevant, not everything**.
- [ ] Output was **inspected + the prompt refined** on gaps (iteration), not model-blamed.
- [ ] Effective prompts are **saved + versioned** in the shared library ([`50`](./50-CONTINUOUS_IMPROVEMENT.md), [`52`](./52-DESIGN_OPS.md)).
- [ ] The result still went through the **human-accountability gate** ([`53`](./53-AI_COLLABORATION_PROTOCOL.md), [`46`](./46-CODE_REVIEW.md)).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Prompt library | Versioned, searchable scaffold library (per discipline/task) with changelog ([`52`](./52-DESIGN_OPS.md)). |
| Scaffold templates | Snippets/generators for the delegation + audit scaffolds. |
| Prompt linting | Check delegations include role/scope/constraints/floor/DoD/no-fabrication. |
| Outcome tracking | Correlate prompt scaffolds with output quality; improve the winners ([`50`](./50-CONTINUOUS_IMPROVEMENT.md)). |
| Context assembly | Tooling that gathers the *relevant* chapters/code/tokens for a task (not the whole repo). |
| Preamble/floor injection | Auto-append the protocol clauses (self-review/citation/no-fabrication/floor) to delegations ([`53`](./53-AI_COLLABORATION_PROTOCOL.md)). |

---

## 11. References for Further Study
- **The protocol it serves:** [`53-AI_COLLABORATION_PROTOCOL.md`](./53-AI_COLLABORATION_PROTOCOL.md) + [`00-CONSTITUTION.md`](./00-CONSTITUTION.md) §8–9 (agent loop + preamble).
- **Prompting technique:** vendor prompt-engineering guides (OpenAI/Anthropic/Google) — role prompting, few-shot, chain-of-thought, output-formatting (treat as living references; techniques evolve).
- **Reasoning:** the chain-of-thought and self-consistency research (as reference for *when* step-by-step helps).
- **Reuse & governance:** the prompt-library-as-asset practice; the [`README`](./README.md) governance model applied to prompts.
- **Cross-references:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`32-TYPESCRIPT_GUIDE.md`](./32-TYPESCRIPT_GUIDE.md), [`43-CLEAN_CODE.md`](./43-CLEAN_CODE.md), [`50-CONTINUOUS_IMPROVEMENT.md`](./50-CONTINUOUS_IMPROVEMENT.md), [`52-DESIGN_OPS.md`](./52-DESIGN_OPS.md), [`53-AI_COLLABORATION_PROTOCOL.md`](./53-AI_COLLABORATION_PROTOCOL.md), and every chapter's "Prompt example" section.

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Delegation prompts using the studio scaffold | ≥ 95% |
| Prompts that state the floor + no-fabrication explicitly | 100% |
| Prompts requiring self-review + citation | 100% |
| Off-target output traced to prompt (not model) + prompt refined | ≥ 90% |
| Effective prompts saved to the versioned library | Yes |
| First-attempt output meeting the DoD | ↑ trend |
| Rework due to under-specified prompts | ↓ trend |

---

*End of `54-PROMPT_ENGINEERING.md`.*
