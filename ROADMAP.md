# ActProofs — Roadmap

This document defines the evolution path of the ActProofs project.

ActProofs is developed as an open standard with a clear separation between:
- specification,
- reference implementation,
- commercial services.

---

## v0.1 — Draft Standard (Current)

**Status:** Draft  
**Goal:** Clarity, credibility, adoption, regulatory discussion

### Scope
- Define a clear, minimal, auditable standard
- Establish ActProofs as a new category: proof of authorization of automated actions
- Enable independent verification without trust assumptions

### Deliverables
- README.md (project definition and positioning)
- actproof-spec.md (format and rules)
- actproof-verification.md (verification rules)
- actproof-examples.md (realistic examples)
- Basic website (documentation-first, no pricing)

### Non-goals
- No payments
- No SLA
- No legal guarantees
- No execution or enforcement logic

v0.1 is intentionally non-commercial.

---

## v0.2 — Reference Implementation & Paid Issuance

**Status:** Planned  
**Goal:** Monetization through usage, not lock-in

### Scope
- Paid issuance of ActProofs
- Still an open standard
- Still stateless and verification-first

### Additions
- Reference API for issuing ActProofs
- Stable issuer keys and verification endpoints
- Pricing for proof issuance
- Usage tracking (non-invasive, non-identifying)

### Monetization
- Subscription-based proof packs
  - Starter
  - Professional
  - Enterprise
- No unlimited plans
- No per-user pricing
- Pay for issued proofs only

### What remains unchanged
- Specification stays open
- Proofs remain portable
- Verification remains independent
- Self-hosting remains possible

---

## v1.0 — Maturity & Governance-Ready

**Status:** Future  
**Goal:** Regulatory-grade stability and trust

### Scope
- Specification freeze (backward compatibility guaranteed)
- Formal versioning and change control
- Long-term verification guarantees

### Additions
- Governance model for the standard
- Issuer transparency commitments
- Optional legal documentation
- Audit and insurance alignment

### Target users
- Regulated enterprises
- AI governance teams
- Auditors and insurers
- Critical infrastructure operators

---

## Long-Term Vision

ActProofs aims to become:
- the standard receipt for authorizing automated actions,
- a neutral layer between IAM and execution systems,
- a foundational building block for AI governance.

---

## Guiding Principles

- Open specification first
- Monetize implementation, not the standard
- No identity management
- No execution logic
- No blockchain
- No hype

---

## Status

This roadmap reflects the current intent of the ActProofs project.

It may evolve, but v0.1 proofs will remain verifiable indefinitely.
