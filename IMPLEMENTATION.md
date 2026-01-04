# IMPLEMENTATION.md — ActSpec v0.1

**Status:** Normative  
**Applies to:** Issuers and Verifiers implementing ActSpec v0.1  
**Scope:** Offline cryptographic verification and compliant issuance  
**Authority:** ActProofs Foundation

This document is **normative**. Any deviation results in a **NON-COMPLIANT** implementation.

---

## 1. Conformance Requirements

An implementation is **ActSpec v0.1 compliant** if and only if **ALL** of the following are true:

1. It implements **exactly** the verification algorithm defined in Section 3.
2. It enforces **RFC 8785 (JCS)** canonicalization without exception.
3. It enforces **spec version locking** (`actspec-v0.1` only).
4. It passes **ALL** official test vectors in  
   `fixtures/actspec-v0.1.test-vectors.json`.
5. It rejects **any** proof that fails **any single step** below.

Partial compliance is **not allowed**.

---

## 2. Definitions (Normative)

**ActProof**  
The signed receipt returned by an Issuer. It contains a payload and a signature.

**Payload**  
The ActProof object **excluding** the `signature` field.

**Canonical Payload String**  
The RFC 8785 canonical JSON string derived from the payload.

**Issuer Public Key**  
The Ed25519 public key published by the Issuer (e.g. `.well-known/jwks.json`).

---

## 3. Verification Algorithm (Normative)

A verifier **MUST** execute the following steps **in order**.

Failure at **any step** MUST return `valid = false`.

### Step 1 — Spec Version Enforcement
The verifier MUST reject the proof if:
- `proof.spec` is missing, OR
- `proof.spec !== "actspec-v0.1"`

This prevents downgrade and cross-spec attacks.

---

### Step 2 — Structural Integrity Check
The verifier MUST reject the proof if **any** of the following fields are missing:

- `spec`
- `id`
- `issued_at`
- `manifest_hash`
- `issuer.id`
- `signature.value`
- `signature.alg`

No default values are allowed.

---

### Step 3 — Algorithm Enforcement
The verifier MUST reject the proof if:

- `signature.alg !== "Ed25519"`

Algorithm substitution is a **fatal error**.

---

### Step 4 — Payload / Signature Separation
The verifier MUST construct the payload by:

- Removing the entire `signature` object
- Keeping **all other fields unchanged**

The verifier MUST NOT:
- Modify field values
- Reorder keys manually
- Inject missing fields

---

### Step 5 — Canonicalization (RFC 8785)
The verifier MUST canonicalize the payload using **RFC 8785 (JCS)**.

Canonicalization rules are **MANDATORY**:

- Keys sorted lexicographically
- No whitespace
- UTF-8 encoding
- IEEE-754 number formatting

Using generic JSON serializers (e.g. `JSON.stringify`) is **NON-COMPLIANT** unless they strictly implement RFC 8785.

If canonicalization fails, verification MUST fail.

---

### Step 6 — Cryptographic Verification
The verifier MUST:

1. Encode the canonical payload string as UTF-8 bytes
2. Decode the signature value from hex to bytes
3. Decode the public key from hex to bytes
4. Verify the Ed25519 signature over the canonical payload

If signature verification fails, the proof is **INVALID**.

---

### Step 7 — Result
If and only if **all previous steps succeed**, the proof is **cryptographically valid**.

Operational checks (revocation, age, policy) are OPTIONAL and MUST NOT affect cryptographic validity.

---

## 4. Explicit Security Rules

### 4.1. Signature Coverage (Critical)
The signature MUST cover **ALL** of the following fields:

- `spec`
- `id`
- `issued_at`
- `manifest_hash`
- `issuer`

Verifying only `manifest_hash` is **INSECURE** and **NON-COMPLIANT**.

---

### 4.2. Replay & Mutation Protection
Mutation of **any** signed field (timestamp, ID, issuer, version) MUST cause verification failure.

---

### 4.3. Trust Boundary
ActSpec guarantees:
- Integrity of the signed payload
- Accuracy of the issuance timestamp
- Authenticity of the Issuer

ActSpec does NOT guarantee:

- Truthfulness of the manifest
- Identity of the human actor
- Correctness or safety of the action

---

## 5. Test Vector Compliance (Mandatory)

Implementations MUST pass **ALL** vectors in:
fixtures/actspec-v0.1.test-vectors.json

Rules:

- `expected_verify = true` → verifier MUST return valid
- `expected_verify = false` → verifier MUST return invalid
- The `canonical_payload` field is **DEBUG ONLY**
- Verifiers MUST reconstruct canonical strings locally

Failing **one** vector = **NON-COMPLIANT**

---

## 6. Issuer Requirements (Summary)

Issuers MUST:

- Accept **ONLY** `manifest_hash` (blind signing)
- Generate UUIDv4 `id`
- Generate trusted UTC `issued_at`
- Canonicalize payload using RFC 8785
- Sign using Ed25519
- Publish public keys permanently

Issuers MUST NOT:
- Receive manifest content
- Store sensitive data
- Modify client hashes
- Sign non-canonical payloads

---

## 7. Non-Compliance Clause

Any system that:
- Skips canonicalization
- Signs only hashes
- Accepts mismatched spec versions
- Uses non-Ed25519 signatures
- Fails test vectors

**MUST NOT** claim ActSpec v0.1 compatibility.

---

## 8. Canonical Enforcement Statement

> If two independent implementations produce different verification results for the same ActProof, at least one of them is non-compliant.

---

## 9. Final Authority

This document overrides examples, blog posts, SDK defaults, and marketing material.

**Only this file + the test vectors define compliance.**

Authorization without proof is liability.
