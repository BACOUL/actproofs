import fs from 'fs';
import path from 'path';
import { verifyActProof, ActProof } from '../packages/verify/index'; // Adjust path to your SDK location

// Load the Official Test Vectors
const vectorsPath = path.join(__dirname, '../fixtures/actspec-v0.1.test-vectors.json');
const testSuite = JSON.parse(fs.readFileSync(vectorsPath, 'utf-8'));

describe('ActSpec v0.1 Compliance Suite', () => {
  const PUBLIC_KEY = testSuite.test_keys.public_key_hex;

  console.log(`Loading ${testSuite.vectors.length} vectors from ${testSuite.meta.format} (v${testSuite.meta.version})`);

  // Iterate over every vector defined in the JSON file
  testSuite.vectors.forEach((vector: any) => {
    
    test(`[${vector.id}] ${vector.name}`, async () => {
      // 1. Construct the Proof Object as the API would return it
      // The vector splits 'input' (payload) and 'signature', we merge them for the SDK.
      const proof: ActProof = {
        ...vector.input,
        signature: vector.signature
      };

      // 2. Run the Verification SDK
      const isValid = await verifyActProof(proof, PUBLIC_KEY);

      // 3. Assert Compliance
      if (vector.expected_verify) {
        expect(isValid).toBe(true);
      } else {
        expect(isValid).toBe(false);
      }
    });

  });
});
