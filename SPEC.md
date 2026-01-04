# ActSpec v0.1 — Proof of Authorization Standard

**Status:** Public Draft
**Version:** v0.1
**Maintainer:** ActProofs Foundation

---

## 1. Abstract

ActSpec defines an open cryptographic standard for issuing and verifying proofs that an automated or AI-driven action was explicitly authorized by a responsible entity at a specific time and in a defined context.

An **ActProof** is a cryptographic receipt. It records authorization intent, not execution.

## 2. Motivation

### 2.1. What This Standard Solves
Modern systems rely on automation, AI agents, and CI/CD pipelines that can trigger actions with real-world impact. While execution logs exist, they do not prove intent, approval, or responsibility.

ActSpec fills this gap by providing portable, independently verifiable evidence that an authorization decision occurred.

### 2.2. Scope
**What ActSpec Is:**
* A cryptographic receipt format
* A stateless verification protocol
* A governance and compliance building block
* An offline-verifiable proof mechanism

**What ActSpec Is Not:**
* Not an execution engine
* Not an IAM, SSO, or RBAC system
* Not a policy engine
* Not a workflow orchestrator
* Not a logging system
* Not a blockchain

**ActSpec never executes, blocks, or permits actions.**

### 2.3. Core Principle
> **Authorization is not execution.**

ActSpec certifies that an *authorization existed*. It does not assert whether the action was correct, safe, or executed.

---

## 3. High-Level Protocol Flow

1.  The client defines an **Authorization Manifest** locally.
2.  The client **canonicalizes** the manifest.
3.  The client **hashes** the canonicalized manifest using SHA-256.
4.  The client sends **only the hash** to the ActProofs Issuer.
5.  The Issuer **timestamps** and **signs** a receipt.
6.  The **ActProof** is returned and can be verified offline.

**Security Note:** At no point does the Issuer receive sensitive data, parameters, prompts, or PII.

---

## 4. Data Structures

### 4.1. Authorization Manifest
The Authorization Manifest is client-owned and never transmitted in clear. It is cryptographically bound to the real action via hashing.

It defines:
* **Who** authorizes (Actor)
* **What** action is authorized
* **In which** context
* **Under which** constraints

### 4.2. ActProof Receipt
The Issuer returns a signed ActProof containing:
* Specification version
* Unique proof ID
* Timestamp of issuance
* Manifest hash
* Issuer identifier
* Cryptographic signature

The ActProof is a portable file that can be stored, shared, audited, and verified independently.

---

## 5. Cryptographic Design

* **Signature Algorithm:** Ed25519
* **Hash Algorithm:** SHA-256
* **Canonicalization:** RFC 8785 (JSON Canonicalization Scheme)

### 5.1. Signature Coverage
The signature MUST cover the canonicalized payload containing:
* `spec`
* `id`
* `issued_at`
* `manifest_hash`
* `issuer`

**Security Requirement:** Signing only the `manifest_hash` is insufficient and insecure; metadata integrity is mandatory.

---

## 6. Verification Rules

A verifier MUST perform the following steps. Failure at any step invalidates the proof.

1.  **Enforce** the spec version.
2.  **Validate** required fields.
3.  **Separate** payload from signature.
4.  **Canonicalize** the payload using RFC 8785.
5.  **Verify** the Ed25519 signature using the Issuer's public key.
6.  **(Optional)** Check revocation status via the Issuer.

### 6.1. Stateless Verification
ActSpec supports full offline verification. Only the ActProof file and the Issuer public key are required.

---

## 7. Revocation Model

* **Cryptographic Validity:** Immutable. The math always holds.
* **Operational Trust:** Mutable.

A revoked proof remains mathematically valid but is flagged as **operationally untrusted**.

---

## 8. Trust Boundary

### 8.1. Client Responsibilities
* Define authorization intent.
* Protect sensitive data.
* Store the Authorization Manifest.
* Map the manifest hash to the real-world action.

### 8.2. Issuer Responsibilities
* Timestamp integrity.
* Signature correctness.
* Tenant authentication.
* Public key governance.

**ActProofs acts as a blind notary.**

---

## 9. Compliance Alignment

ActSpec is designed to support:
* **EU AI Act:** Human Oversight and Record-Keeping (Art. 14).
* **ISO/IEC 42001:** AI Risk Management.
* **GDPR:** Accountability principle.
* Audit, assurance, and governance workflows.

---

## 10. Testing and Conformance

An implementation is **ActSpec v0.1 compliant** if it:
* Passes all official test vectors.
* Matches canonical payloads byte-for-byte.
* Rejects tampered timestamps and invalid signatures.

---

## 11. Canonical Statement

> "ActProofs is a cryptographic receipt proving that an automated action was explicitly authorized by a responsible entity, at a specific time, in a defined context."

---

## 12. Final Note

ActSpec does not replace existing systems. It provides the missing proof layer between authorization and execution.

**Authorization without proof is liability.**
