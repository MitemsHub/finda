---
site: "Helium Health"
url: "https://heliumhealth.com"
date_analyzed: "2026-07-08"
category: "healthcare"
tags: ["healthcare", "healthtech", "africa", "emr", "b2b", "trust", "data-privacy", "clarity", "clinical"]
essence: "African health-tech (EMR/HMIS) that must earn clinical trust: calm, credible, clarity-first design where patient-data safety, interoperability, and operational reliability outrank visual flourish."
confidence: "inferred"
analyst: "agent (Studio OS reference engine)"
---

# Reference Teardown: Helium Health

> **Essence:** Helium Health digitizes African hospitals/clinics with EMR/HMIS software (plus telemedicine, provider financing, claims). As a **clinical B2B** product handling sensitive patient data, its design priorities are **trust, clarity, data safety, and interoperability** — a calm, credible, professional system where a wrong click or unreadable label can affect care. Health-tech is where the Constitution's floor (safety, accessibility, correctness) is most literal.
> **Source:** heliumhealth.com (+ product case study) · analyzed 2026-07-08 · confidence: inferred (public case-study corroboration)

> ⚖️ **Copying-line status:** PASS — principles only. No assets/copy/logos reproduced. Studied as the *healthcare archetype*.

## 1. Design Philosophy
In healthcare, **design is a safety system**. The product must reduce clinician cognitive load in high-stakes, time-pressured contexts; present patient data unambiguously; protect privacy (consent-driven data transfer across facilities); and remain reliable. Marketing must convey **credibility and trust** to institutional buyers (hospitals, payers, governments). Calm, professional, clarity-first — flourish is subordinate to comprehension and safety ([`00`](../00-CONSTITUTION.md) Art. II/III).

## 2. Typography Breakdown
- **Family (inferred):** clean, highly legible sans optimized for **dense clinical data** at small sizes and for calm marketing headings.
- **Hierarchy:** unambiguous — patient names, vitals, alerts must be instantly distinguishable; strong hierarchy prevents dangerous misreads ([`07`](../07-TYPOGRAPHY_SYSTEM.md), [`16`](../16-DASHBOARD_DESIGN.md)).

## 3. Color Palette
- Trust-forward, calm palette (health-tech often uses blues/teals/greens for trust/care/health) + disciplined neutrals; **semantic colors used carefully and always with labels** for clinical states (critical/warning/normal) — color-only status is dangerous in a clinical setting ([`06`](../06-COLOR_SYSTEM.md), [`22`](../22-ACCESSIBILITY.md)).

## 4. Spacing & Density
- Product: **controlled density** — EMRs are information-heavy, but spacing/grouping must keep records scannable and prevent errors ([`08`](../08-SPACING_SYSTEM.md), [`16`](../16-DASHBOARD_DESIGN.md)). Marketing: calmer, more spacious/credible.

## 5. Grid System
- Product: structured record layouts, dashboards, forms (patient intake, HR/payroll embedded in EMR). Marketing: standard capped credible layout with institutional trust cues.

## 6. Motion Language
- Minimal, functional; nothing that delays access to critical information. Reliability > delight in clinical contexts.

## 7. Interaction Patterns
- Data-dense records + forms ([`13`](../13-FORM_DESIGN.md)); **consent-driven data sharing** between facilities (privacy as a first-class flow); role-based access (clinicians/admin); dashboards for operations; unified interface replacing multiple tools.

## 8. UX Principles
- **Safety & clarity first** — the Constitution's floor is literal here ([`00`](../00-CONSTITUTION.md) Art. II/III).
- **Reduce clinician cognitive load** in time-pressured contexts → [`05`](../05-VISUAL_PSYCHOLOGY.md), [`16`](../16-DASHBOARD_DESIGN.md).
- **Privacy & consent as designed flows**, not fine print → [`37`](../37-SECURITY.md), Art. III.
- **Credibility for institutional buyers** (security, compliance, reliability) → [`17`](../17-LANDING_PAGE_DESIGN.md).
- **Interoperability** (data flows safely across products/orgs) → [`40`](../40-API_DESIGN.md), [`39`](../39-DATABASE_DESIGN.md).

## 9. Reusable Ideas (as principles)
- **When stakes are high, clarity + safety outrank aesthetics** (but calm credibility still matters) → [`00`](../00-CONSTITUTION.md), [`16`](../16-DASHBOARD_DESIGN.md).
- **Never color-only for critical status** — clinical/error states use color + icon + text, always → [`22`](../22-ACCESSIBILITY.md), [`06`](../06-COLOR_SYSTEM.md).
- **Consent/privacy as explicit UX flows** for sensitive data → [`37`](../37-SECURITY.md).
- **Trust palette + credibility cues** for institutional B2B buyers → [`06`](../06-COLOR_SYSTEM.md), [`17`](../17-LANDING_PAGE_DESIGN.md).
- **Controlled density** for professional data users (scannable, not sparse) → [`08`](../08-SPACING_SYSTEM.md), [`16`](../16-DASHBOARD_DESIGN.md).

## 10. Things to Avoid
- **Color-only clinical status** — potentially dangerous; always pair with text/icon ([`22`](../22-ACCESSIBILITY.md)).
- **Ambiguous data hierarchy** — misreading a patient record is a safety failure ([`07`](../07-TYPOGRAPHY_SYSTEM.md)).
- **Delightful-but-slow interactions** blocking access to critical info (Art. II).
- **Privacy as fine print** rather than a real consent flow (Art. III, [`37`](../37-SECURITY.md)).
- **Inaccessible clinical UIs** — excludes clinicians/patients with disabilities; unacceptable for health equity (Art. III).

## 11. How to Recreate This Style Without Copying
1. Put **safety + clarity first**: unambiguous hierarchy, never color-only critical status, reliable performance.
2. Design **privacy/consent as explicit flows** for sensitive data ([`37`](../37-SECURITY.md)).
3. Use a **calm trust palette** + **controlled density** for professional data users.
4. Convey **institutional credibility** (security, compliance, reliability) to B2B buyers.
5. Rigorously meet **accessibility** (health equity) and **interoperability** standards.
6. Diverge with your own palette/brand; the point is trust + safety, not copying any health UI.

---
## Mapping to our systems
| Finding | Our chapter |
| --- | --- |
| Safety/clarity first (the literal floor) | [`00`](../00-CONSTITUTION.md), [`16`](../16-DASHBOARD_DESIGN.md) |
| Never color-only for critical status | [`06`](../06-COLOR_SYSTEM.md), [`22`](../22-ACCESSIBILITY.md) |
| Consent/privacy as designed flows | [`37`](../37-SECURITY.md), [`29`](../29-USER_FLOWS.md) |
| Trust palette + institutional credibility | [`06`](../06-COLOR_SYSTEM.md), [`17`](../17-LANDING_PAGE_DESIGN.md) |
