# ActProofs Key Management & Governance Policy

**Version:** 1.0  
**Effective Date:** 2026-01-04  
**Maintainer:** ActProofs Foundation Security Committee

---

## 1. Scope & Purpose

This document defines the governance, lifecycle, and security policies governing
the cryptographic keys used to issue ActProofs.

Its purpose is to clearly separate:
- **Cryptographic validity** (mathematical correctness)
- **Operational trust** (governance, revocation, incident handling)

This policy applies to all production issuers operating under the ActSpec standard.

---

## 2. Root Key Lifecycle

* **Algorithm:** Ed25519 (Edwards-curve Digital Signature Algorithm)
* **Key Type:** Issuer Root Signing Key
* **Validity Period:** 12 months from issuance
* **Rotation Schedule:**  
  A new key pair is generated **30 days before expiration** of the active key
  (Overlap Period) to ensure uninterrupted verification.

Each key pair is identified by a stable **Key ID** (e.g. `actproofs-root-2026`).

---

## 3. Generation & Protection

### 3.1 Key Generation

* Keys MUST be generated in a secure, access-controlled environment.
* **Hardware-backed key storage (HSM / Cloud KMS) is RECOMMENDED** for production issuers.
* For development or early-stage environments:
  - Encrypted secret stores (Vault, KMS-backed env vars) are acceptable
  - Access MUST be logged and auditable

### 3.2 Key Storage

* Private keys MUST NOT be exportable once generated.
* Private keys MUST NOT be accessible by application code outside the signing boundary.
* Public keys MAY be freely distributed.

---

## 4. Public Key Distribution

* All active and historical public keys are published via:
* /.well-known/jwks.json

* or an equivalent immutable distribution endpoint.

* Public keys MUST remain available indefinitely to allow historical verification
of previously issued ActProofs.

---

## 5. Key Rotation Process

1. **Preparation**
 * New key pair generated.
 * Public key added to the public key set.
2. **Transition**
 * Issuer begins signing new ActProofs with the new private key.
 * Verifiers accept signatures from both old and new keys.
3. **Retirement**
 * Old private key is securely destroyed.
 * Old public key remains published permanently.

Key rotation MUST NOT invalidate previously issued proofs.

---

## 6. Compromise & Emergency Procedures

In the event of suspected or confirmed private key compromise:

1. **Immediate Containment**
 * Compromised Key ID is added to the **Issuer Revocation List (IRL)**.
2. **Emergency Rotation**
 * A new key pair is generated immediately.
3. **Transparency**
 * A public incident disclosure is published within **4 hours**.
4. **Operational Impact**
 * All proofs signed by the compromised key during the exposure window are flagged
   as **operationally untrusted**.

**Important:**  
Such proofs remain **cryptographically valid** (the signature verifies),
but MUST be treated as untrusted by relying parties.

---

## 7. Revocation Model

ActProofs distinguishes strictly between:

### 7.1 Cryptographic Validity
* Determined solely by signature verification.
* Immutable and permanent.

### 7.2 Operational Trust
* Determined by governance decisions (key compromise, administrative revocation).
* Mutable over time.

A revoked proof:
- MUST continue to verify cryptographically
- MUST be marked as **revoked / untrusted** by verification services

---

## 8. Verification Guarantees

ActProofs guarantees that:

* Any ActProof issued in the past remains verifiable today
* Provided that:
- The public key was valid **at the time of issuance**
- The proof payload has not been altered

No retroactive cryptographic invalidation is permitted.

---

## 9. Out of Scope (Normative)

The following are explicitly **OUT OF SCOPE** of this policy and the ActProofs Foundation:

* Identity verification of the human actor
* Correctness or safety of the authorized action
* Legal enforceability of an ActProof in a specific jurisdiction
* Client-side manifest generation, storage, or protection
* Mapping between a manifest hash and real-world execution

Responsibility for these aspects lies entirely with the relying party.

---

## 10. Governance Authority

* This policy is maintained by the **ActProofs Foundation Security Committee**.
* Changes require:
- Public versioning
- Clear migration guidance
- Backward compatibility guarantees for existing proofs

---

## 11. Canonical Statement

> “ActProofs guarantees the integrity and timestamp of an authorization receipt.  
> Trust in the authorization itself remains a governance decision.”

---

**End of Policy**
