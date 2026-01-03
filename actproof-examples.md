# ActProofs — Examples

This document provides concrete examples of ActProofs compliant with the ActProofs v0.1 specification.

All examples illustrate **authorization proofs only**.  
Execution of actions is explicitly out of scope.

---

## Example 1 — AI Automated Decision (Human-in-the-loop)

### Context

An AI system is allowed to automatically reject a loan application **only after** explicit human authorization by a compliance officer.

### ActProof (.actproof.json)

{
  "version": "0.1",
  "actor": {
    "id": "user:compliance.officer.123",
    "type": "human",
    "label": "Senior Compliance Officer"
  },
  "action": {
    "id": "ai.loan.rejection",
    "description": "Authorize AI system to reject loan application #A-98423"
  },
  "context": {
    "system": "loan-decision-ai",
    "purpose": "Regulated credit decision",
    "scope": "single-decision"
  },
  "timestamp": {
    "issued_at": "2026-01-03T14:22:51Z"
  },
  "signature": {
    "algorithm": "Ed25519",
    "value": "BASE64_SIGNATURE_PLACEHOLDER",
    "issuer": "actproofs.reference.issuer"
  }
}

This proof can later be presented to auditors or regulators to demonstrate that the automated rejection was explicitly authorized.

---

## Example 2 — Automated Infrastructure Change

### Context

An organization authorizes an automated system to rotate production encryption keys.

### ActProof (.actproof.json)

{
  "version": "0.1",
  "actor": {
    "id": "org:example-corp",
    "type": "organization",
    "label": "Example Corp IT Security"
  },
  "action": {
    "id": "infra.key.rotation",
    "description": "Authorize automated rotation of production encryption keys"
  },
  "context": {
    "system": "cloud-security-platform",
    "purpose": "Operational security maintenance",
    "scope": "scheduled-operation"
  },
  "timestamp": {
    "issued_at": "2026-01-03T01:00:00Z"
  },
  "signature": {
    "algorithm": "Ed25519",
    "value": "BASE64_SIGNATURE_PLACEHOLDER",
    "issuer": "actproofs.reference.issuer"
  }
}

This proof demonstrates that a critical automated action affecting infrastructure was formally approved.

---

## Example 3 — Fully Automated AI Agent Authorization

### Context

A company authorizes an autonomous AI agent to execute predefined trading actions within strict limits.

### ActProof (.actproof.json)

{
  "version": "0.1",
  "actor": {
    "id": "system:board-approval-2026",
    "type": "system",
    "label": "Board-approved authorization process"
  },
  "action": {
    "id": "ai.trading.execution",
    "description": "Authorize AI agent to execute trades within approved risk limits"
  },
  "context": {
    "system": "autonomous-trading-ai",
    "purpose": "Algorithmic trading operations",
    "scope": "predefined-policy"
  },
  "timestamp": {
    "issued_at": "2026-01-02T18:45:00Z"
  },
  "signature": {
    "algorithm": "Ed25519",
    "value": "BASE64_SIGNATURE_PLACEHOLDER",
    "issuer": "actproofs.reference.issuer"
  }
}

This proof provides evidence that autonomous behavior was authorized at governance level.

---

## Notes

- These examples intentionally avoid personal data.
- Identity authenticity is declared, not verified.
- Signature values are placeholders.
- Verification requires only the ActProof file and the public verification rules defined in the specification.

Absence of an ActProof means absence of proof of authorization.
