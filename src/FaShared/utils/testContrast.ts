/**
 * Test script to check purple-on-purple contrast fixes
 * Run this in your browser console or import in main.tsx during dev
 */

import { testPurpleFixes, checkTransparentOverlay } from "./accessibleColors";

// Run the tests
if (import.meta.env.DEV) {
  console.log("🎨 Running WCAG Contrast Tests...");
  testPurpleFixes();

  // Test transparent overlay scenarios
  console.log("\n\n🔍 Testing Transparent Overlay Scenarios...");

  // Wiki search dropdown text over various content
  const overlayTests = [
    {
      text: "var(--text-primary)", // You'd need to get computed value
      overlay: "var(--surface-primary)",
      behind: "#8b5cf6", // Purple content behind
      label: "Search dropdown over purple content",
    },
    {
      text: "#ffffff",
      overlay: "rgba(42, 26, 111, 0.8)", // Semi-transparent FanArcs purple
      behind: "#ffffff",
      label: "White text on semi-transparent purple overlay",
    },
  ];

  overlayTests.forEach(({ text, overlay, behind, label }) => {
    console.log(`\n📋 ${label}`);
    try {
      const result = checkTransparentOverlay(text, overlay, behind);
      console.log(result.details);
      console.log(`Suggested color: ${result.suggestion}`);
    } catch (e) {
      console.log(
        `⚠️ Note: CSS variables need computed values. Test with actual hex colors.`,
      );
    }
  });
}
