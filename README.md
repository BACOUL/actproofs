ActSpec v0.1 — Proof of Authorization Standard

Status: Public Draft
Version: v0.1
Maintainer: ActProofs Foundation

ActSpec defines an open cryptographic standard for issuing and verifying proofs that an automated or AI-driven action was explicitly authorized by a responsible entity at a specific time and in a defined context.

An ActProof is a cryptographic receipt. It records authorization intent, not execution.

WHAT THIS STANDARD SOLVES

Modern systems rely on automation, AI agents, and CI/CD pipelines that can trigger actions with real-world impact. Execution logs exist, but they do not prove intent, approval, or responsibility.

ActSpec fills this gap by providing portable, independently verifiable evidence that an authorization decision occurred.

WHAT ACTSPEC IS

- A cryptographic receipt format
- A stateless verification protocol
- A governance and compliance building block
- An offline-verifiable proof mechanism

WHAT ACTSPEC IS NOT

- Not an execution engine
- Not an IAM, SSO, or RBAC system
- Not a policy engine
- Not a workflow orchestrator
- Not a logging system
- Not a blockchain

ActSpec never executes, blocks, or permits actions.

CORE PRINCIPLE

Authorization is not execution.

ActSpec certifies that an authorization existed. It does not assert whether the action was correct, safe, or executed.

HIGH-LEVEL PROTOCOL FLOW

1. The client defines an Authorization Manifest locally.
2. The client canonicalizes the manifest.
3. The client hashes the canonicalized manifest using SHA-256.
4. The client sends only the hash to the ActProofs Issuer.
5. The Issuer timestamps and signs a receipt.
6. The ActProof is returned and can be verified offline.

At no point does the Issuer receive sensitive data, parameters, prompts, or PII.

AUTHORIZATION MANIFEST

The Authorization Manifest is client-owned and never transmitted in clear.

It defines:
- Who authorizes
- What action is authorized
- In which context
- Under which constraints

The manifest is cryptographically bound to the real action via hashing.

ACTPROOF RECEIPT

The Issuer returns a signed ActProof containing:
- Specification version
- Unique proof ID
- Timestamp of issuance
- Manifest hash
- Issuer identifier
- Cryptographic signature

The ActProof is a portable file that can be stored, shared, audited, and verified independently.

CRYPTOGRAPHIC DESIGN

- Signature algorithm: Ed25519
- Hash algorithm: SHA-256
- Canonicalization: RFC 8785 JSON Canonicalization Scheme
- Signature coverage includes:
  spec
  id
  issued_at
  manifest_hash
  issuer

Signing only the hash is insufficient and insecure.

VERIFICATION RULES

A verifier must:
- Enforce the spec version
- Validate required fields
- Separate payload from signature
- Canonicalize payload using RFC 8785
- Verify the Ed25519 signature using the Issuer public key
- Optionally check revocation status

Failure at any step invalidates the proof.

STATELESS VERIFICATION

ActSpec supports full offline verification.
Only the ActProof file and the Issuer public key are required.

REVOCATION MODEL

Cryptographic validity is immutable.
Operational trust may change.

A revoked proof remains mathematically valid but is flagged as operationally untrusted.

TRUST BOUNDARY

Client responsibilities:
- Define authorization intent
- Protect sensitive data
- Store the Authorization Manifest
- Map manifest hash to real-world action

Issuer responsibilities:
- Timestamp integrity
- Signature correctness
- Tenant authentication
- Public key governance

ActProofs acts as a blind notary.

COMPLIANCE ALIGNMENT

ActSpec is designed to support:
- EU AI Act (Human Oversight and Record-Keeping)
- ISO/IEC 42001 (AI Risk Management)
- GDPR Accountability principle
- Audit, assurance, and governance workflows

TESTING AND CONFORMANCE

An implementation is ActSpec v0.1 compliant if it:
- Passes all official test vectors
- Matches canonical payloads byte-for-byte
- Rejects tampered timestamps and invalid signatures

CANONICAL STATEMENT

ActProofs is a cryptographic receipt proving that an automated action was explicitly authorized by a responsible entity, at a specific time, in a defined context.

STATUS

This specification is a public draft.
Backward-incompatible changes may occur until version 1.0.

FINAL NOTE

ActSpec does not replace existing systems.
It provides the missing proof layer between authorization and execution.

Authorization without proof is liability.
