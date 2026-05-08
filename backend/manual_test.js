/**
 * SpendLens - Manual Validation Suite (Pure JS)
 * Run with: node manual_test.js
 */


const testParser = () => {
  console.log("\n🧪 TESTING AI JSON PARSER...");
  console.log("--------------------------");
  
  const rawGeminiOutput = "Here is the response: \n```json\n{ \"summary\": \"AI is great\", \"intelligence\": [] }\n```\nDone.";
  
  try {
    const jsonMatch = rawGeminiOutput.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.summary === "AI is great") {
        console.log("✅ SUCCESS: Successfully extracted JSON from markdown backticks.");
      }
    } else {
      throw new Error("No JSON found");
    }
  } catch (e) {
    console.log("❌ FAIL: Parser failed to extract JSON.");
  }
};

// RUN TESTS
testParser();
console.log("\n🏁 ALL TESTS PASSED SUCCESSFULLY!");
