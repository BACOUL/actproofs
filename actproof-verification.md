# ActProofs — Verification Rules

This document defines how an ActProof compliant with ActProofs v0.1 MUST be verified.

It specifies deterministic verification rules intended for auditors, regulators, insurers, and independent third parties.

No implementation code is provided. Only normative rules.

---

## 1. Purpose of Verification

Verification answers one and only one question:

Was a specific automated action explicitly authorized by a declared actor, in a defined context, at a given point in time?

Verification does NOT prove:
- that the action was executed,
- that the actor’s identity is authentic,
- that the authorization was legitimate or lawful,
- that the issuer is trusted.

Verification proves the existence and integrity of an authorization decision.

---

## 2. Verification Inputs

A verifier requires:
- the ActProof file (.actproof.json),
- the ActProofs v0.1 specification,
- the public verification key corresponding to the issuer (out-of-band).

No access to internal systems, logs, or databases is required.

---

## 3. Supported Algorithms (v0.1)

In ActProofs v0.1, the only supported signature algorithm is:

- Ed25519

Future versions may add algorithms, but v0.1 verifiers MUST reject unsupported algorithms.

---

## 4. Canonicalization Rules

Before signature verification, the ActProof MUST be canonicalized.

Canonicalization rules are mandatory and deterministic.

### 4.1 JSON Normalization

- UTF-8 encoding
- No whitespace significance
- No trailing commas
- No comments
- Numbers MUST NOT be rewritten or normalized

### 4.2 Field Ordering

Top-level fields MUST be ordered exactly as follows:

1. version  
2. actor  
3. action  
4. context  
5. timestamp  

The signature field MUST be excluded from the canonical payload.

Nested objects MUST preserve the field order defined in the specification.

---

## 5. Signature Payload

The signature MUST cover the canonicalized JSON object composed of:

- version
- actor
- action
- context
- timestamp

The signature object itself MUST NOT be included in the signed payload.

Any modification to these fields invalidates the signature.

---

## 6. Verification Procedure

A verifier MUST perform the following steps in order:

1. Parse the ActProof as strict JSON.
2. Confirm that version equals "0.1".
3. Confirm that all required top-level fields are present.
4. Reject any unknown top-level fields.
5. Validate field types and required subfields.
6. Validate that timestamp.issued_at is a valid ISO-8601 UTC value.
7. Canonicalize the payload according to Section 4.
8. Extract the signature algorithm, value, and issuer.
9. Verify the signature cryptographically using the issuer’s public key.
10. Declare the ActProof valid only if all steps succeed.

Failure at any step results in invalid verification.

---

## 7. Verification Outcome

The verification result MUST be binary:

- VALID: The ActProof is intact and cryptographically authentic.
- INVALID: The ActProof is malformed, altered, or unverifiable.

Partial validity is not allowed.

---

## 8. What a Valid ActProof Proves

A valid ActProof proves that:

- an authorization decision existed,
- it was made at the recorded timestamp,
- it concerned the described action,
- it was issued by the declared issuer,
- it has not been altered since issuance.

---

## 9. What a Valid ActProof Does NOT Prove

A valid ActProof does NOT prove:

- that the action was executed,
- that the actor identity is authentic or verified,
- that the authorization was legally sufficient,
- that the issuer is trusted or reputable,
- that the authorization was appropriate or ethical.

Trust and legitimacy are external to this specification.

---

## 10. Security Considerations

- Loss of issuer private keys compromises future proofs, not past integrity.
- Timestamp trust depends on issuer time source.
- Verification assumes secure distribution of issuer public keys.
- ActProofs does not mitigate social engineering or policy abuse.

---

## 11. Forward Compatibility

Verifiers SHOULD reject proofs declaring unsupported versions.

v1.0 will guarantee backward verification compatibility with v0.1 proofs.

---

## 12. Status

This document defines verification rules for ActProofs v0.1 (Draft).

It is intended for independent verification, audits, regulatory review, and long-term evidentiary use.
