// Quick debugging script to test timeline data flow
// Run this in browser console to debug the data service

import { dataService } from "./src/services/dataService.js";

// Test character with timeline data (Goku)
const testCharacterId = "550e8400-e29b-41d4-a716-446655440001";

console.log("🧪 Testing timeline data flow...");

dataService
  .getCharacterComplete(testCharacterId)
  .then((data) => {
    console.log("📦 Raw data from dataService:", data);
    console.log("🕒 Timeline events:", data.character_events);
    console.log("📊 Timeline count:", data.character_events?.length || 0);

    if (data.character_events && data.character_events.length > 0) {
      console.log("✅ Timeline data found!");
      console.log("🎯 First event:", data.character_events[0]);

      // Check for required fields
      const firstEvent = data.character_events[0];
      console.log("🔍 Event structure check:");
      console.log("- id:", firstEvent.id);
      console.log("- title:", firstEvent.title);
      console.log("- description:", firstEvent.description);
      console.log("- order_index:", firstEvent.order_index);
      console.log("- category:", firstEvent.category);
    } else {
      console.log("❌ No timeline events found");
    }
  })
  .catch((error) => {
    console.error("💥 Error testing timeline data:", error);
  });
