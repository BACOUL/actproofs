# ActProofs Specification

Version: v0.1 (Draft)  
Status: Draft standard  
Scope: Proof of authorization of automated actions

## 1. Purpose

This document defines the ActProofs v0.1 specification.

ActProofs specifies a cryptographic proof format used to attest that a specific automated action was explicitly authorized by an identified actor or entity, in a defined context, at a specific point in time.

This specification defines the structure, required fields, semantics, and verification rules of an ActProof.

Execution, enforcement, identity verification, and storage are explicitly out of scope.

## 2. Definitions

Actor: Entity (human, organization, or system) that authorizes an action.  
Action: Description of the automated act being authorized.  
Authorization: Explicit decision allowing an action to occur.  
ActProof: Cryptographic receipt proving that an authorization occurred.  
Issuer: System generating and signing the ActProof.  
Verifier: Any party validating an ActProof independently.

## 3. Mental Model

Identified actor  
→ Authorization decision  
→ ActProof (this specification)  
→ Action execution (out of scope)

## 4. File Format

An ActProof is a self-contained JSON file, typically named:

.actproof.json

The file must be portable, immutable once issued, and independently verifiable.

## 5. Canonical Structure

An ActProof MUST be a JSON object with the following top-level fields:

- version  
- actor  
- action  
- context  
- timestamp  
- signature  

No additional top-level fields are allowed in v0.1.

## 6. Version

version (string, required)

Must be set to "0.1".

## 7. Actor

actor (object, required)

Fields:
- id (string, required)  
- type (human | organization | system, required)  
- label (string, optional)  

The actor is declared, not authenticated.

## 8. Action

action (object, required)

Fields:
- id (string, required)  
- description (string, optional)  

The action describes what is being authorized, not how it is executed.

## 9. Context

context (object, required)

Fields:
- system (string, required)  
- purpose (string, optional)  
- scope (string, optional)  

Context must not include sensitive personal data.

## 10. Timestamp

timestamp (object, required)

Fields:
- issued_at (ISO-8601 UTC string, required)  

The timestamp represents the time of authorization, not execution.

## 11. Signature

signature (object, required)

Fields:
- algorithm (string, required)  
- value (string, required)  
- issuer (string, required)  

The signature must cover all fields except itself.

## 12. Verification Rules

To verify an ActProof, a verifier must:

1. Confirm the specification version is supported.  
2. Validate the JSON structure strictly.  
3. Validate timestamp format.  
4. Recompute the signature input deterministically.  
5. Verify the cryptographic signature.  
6. Ensure no required field is missing or altered.  

Verification must not rely on trust in the issuer or access to internal systems.

## 13. Invariants

- An ActProof is immutable once issued.  
- An ActProof proves authorization, not execution.  
- ActProofs does not prove identity authenticity.  
- An ActProof is independently verifiable.  
- Absence of an ActProof means no proof of authorization exists.

## 14. Out of Scope

- Action execution  
- Identity verification  
- Access control  
- Workflow orchestration  
- Logging systems  
- Server-side storage  
- Blockchain or distributed ledgers  

## 15. Forward Compatibility

Future versions may add optional fields.  
Existing fields must not change semantics.  
v1.0 will guarantee backward compatibility with v0.1.

## 16. Status

This document defines ActProofs v0.1 (Draft).

It is intended for early adopters, reference implementations, and regulatory discussion.
