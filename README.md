# ActProofs

**Specification version:** v0.1 (Draft)

ActProofs is an open standard for **proof of authorization of automated actions**.

It produces a **cryptographic, portable, and independently verifiable receipt** proving that a specific automated action (notably involving AI) was explicitly authorized by an **identified actor or entity**, in a **defined context**, at a **specific point in time**.

**ActProofs is best understood as a cryptographic receipt for authorizing automated actions.**

ActProofs is designed for **compliance**, **auditability**, **accountability**, and **governance** of automated and AI-driven systems.

---

## WHY ACTPROOFS EXISTS

Modern systems increasingly rely on automated workflows and AI agents capable of triggering actions with real-world impact.

Regulators, auditors, insurers, and governance teams are asking a fundamental question:

> **Who authorized this automated action, and when?**

Today, the market provides only:
- internal logs (mutable, non-portable, non-opposable),
- IAM / RBAC systems (access control, not proof),
- execution traces (post-hoc, incomplete),
- blockchain-based approaches (heavy, misaligned, unnecessary).

There is **no standard, portable, opposable proof of authorization**.

**ActProofs fills this gap.**

---

## WHAT ACTPROOFS IS

ActProofs is:
- a **standardized proof format** for authorization decisions,
- a **cryptographic receipt** that can be stored, shared, and audited,
- **stateless by design** (no server-side storage required),
- **verification-first** (no implicit trust in the issuer),
- a **compliance and governance building block**.

**Mental model:**

Identified actor → Authorization → **ActProof** → Action *(out of scope)*

---

## WHAT ACTPROOFS IS NOT

ActProofs does **not**:
- execute actions,
- trigger workflows,
- enforce authorization,
- manage identities,
- authenticate users or systems,
- replace IAM, RBAC, SSO, or PKI,
- store logs or content,
- rely on blockchain or distributed ledgers.

**ActProofs records authorization decisions only.**

---

## CORE PRINCIPLES

### 1. Identified initiator  
The actor, organization, or system authorizing the action is **known and explicitly declared**.

### 2. No identity management  
ActProofs records **declared identity context** but does **not** verify or manage identities.

### 3. No execution  
Authorization proof is **independent from action execution**.

### 4. Stateless by design  
No server-side storage is required to validate a proof.

### 5. Independent verification  
Any third party can verify an ActProof **without trusting the issuer**.

### 6. Portable and durable  
Proofs are **files**, not database records.

---

## THE ACTPROOF (CONCEPT)

An **ActProof** is a self-contained file (for example, `.actproof.json`) that cryptographically binds:
- the **authorized action**,
- the **identified authorizing actor or entity**,
- the **context** (system, purpose, scope),
- a **timestamp**,
- a **digital signature**.

The proof can be archived, shared, audited, or provided to regulators, insurers, or third parties.

Verification is possible **at any time**, without access to internal systems.

The exact format and rules are defined by the **ActProofs specification**.

---

## REGULATORY ALIGNMENT

ActProofs is designed to support requirements related to:
- AI governance and accountability,
- oversight of automated decisions,
- audit and risk management,
- cybersecurity and operational resilience,
- insurance and liability assessment.

It directly addresses a recurring regulatory expectation:

> **Demonstrate that an automated action was explicitly authorized by a responsible entity.**

This is achieved **without** storing personal data, executing actions, or centralizing logs.

---

## TYPICAL USE CASES

- Authorization of AI-driven actions before execution  
- Approval of automated workflows in regulated environments  
- Human-in-the-loop authorization evidence  
- Audit trails for AI systems  
- Insurance and liability documentation  
- Governance of autonomous or semi-autonomous agents  
- Approval records for critical system actions  

---

## POSITIONING

ActProofs sits **between**:
- identity and access management systems,
- execution engines and automation platforms,
- logging and monitoring tools.

It acts as a **neutral, portable proof layer**.

ActProofs is best described as:
> **a receipt for authorizing an automated action.**

---

## PROJECT STATUS

- Specification: **v0.1 (Draft)**
- Reference implementation: **In progress**
- Target users: **B2B, compliance, audit, AI governance teams**

ActProofs is developed as an **open standard**, designed for interoperability and long-term verifiability.

---

## ROADMAP

- **v0.1** — Draft specification and conceptual validation  
- **v0.2** — Stabilized format, reference implementation, paid issuance  
- **v1.0** — Stable standard suitable for contractual and audit references  

---

## PHILOSOPHY

No hype.  
No blockchain.  
No execution logic.  

**Just provable authorization of automated actions.**
