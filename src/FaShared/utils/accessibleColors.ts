/**
 * Accessible Color Utilities
 * Auto-fixes color contrast issues using color2k
 */

import { readableColor, getContrast, darken, lighten } from "color2k";

/**
 * Ensures text color has sufficient contrast against background
 * @param textColor - The text color (hex, rgb, etc.)
 * @param bgColor - The background color
 * @param minRatio - Minimum contrast ratio (4.5 for WCAG AA, 3.0 for large text)
 * @returns Adjusted color that meets contrast requirements
 */
export function ensureContrast(
  textColor: string,
  bgColor: string,
  minRatio: number = 4.5
): string {
  try {
    const currentRatio = getContrast(textColor, bgColor);

    console.log(
      `🎨 Checking contrast: ${textColor} on ${bgColor} = ${currentRatio.toFixed(
        2
      )}:1`
    );

    if (currentRatio >= minRatio) {
      console.log(`✅ Passes (required: ${minRatio}:1)`);
      return textColor;
    }

    console.log(`❌ Fails (required: ${minRatio}:1) - attempting fix...`);

    // Strategy 1: Try darkening the text color
    let adjusted = textColor;
    let attempts = 0;

    while (getContrast(adjusted, bgColor) < minRatio && attempts < 10) {
      adjusted = darken(adjusted, 0.1);
      attempts++;
    }

    if (getContrast(adjusted, bgColor) >= minRatio) {
      console.log(
        `✅ Fixed by darkening: ${adjusted} (${getContrast(
          adjusted,
          bgColor
        ).toFixed(2)}:1)`
      );
      return adjusted;
    }

    // Strategy 2: Try lightening instead
    adjusted = textColor;
    attempts = 0;

    while (getContrast(adjusted, bgColor) < minRatio && attempts < 10) {
      adjusted = lighten(adjusted, 0.1);
      attempts++;
    }

    if (getContrast(adjusted, bgColor) >= minRatio) {
      console.log(
        `✅ Fixed by lightening: ${adjusted} (${getContrast(
          adjusted,
          bgColor
        ).toFixed(2)}:1)`
      );
      return adjusted;
    }

    // Strategy 3: Last resort - use pure black or white
    const fallback = readableColor(bgColor);
    console.log(`⚠️ Using fallback: ${fallback}`);
    return fallback;
  } catch (error) {
    console.error("Error checking contrast:", error);
    return textColor; // Return original if error
  }
}

/**
 * Test purple/blue color combinations and log fixes
 */
export function testPurpleFixes() {
  console.log("\n🧪 Testing Color Contrast Fixes\n");

  // Common color combinations from your project
  const tests = [
    // Purple text on purple backgrounds
    { text: "#8B5CF6", bg: "#6D28D9", label: "Light purple on dark purple" },
    { text: "#A78BFA", bg: "#7C3AED", label: "Lavender on medium purple" },
    { text: "#C4B5FD", bg: "#8B5CF6", label: "Pale purple on bright purple" },

    // Blue combinations (WikiSearchBar tags)
    { text: "#ffffff", bg: "#3b82f6", label: "White text on blue tag" },
    { text: "#ffffff", bg: "#10b981", label: "White text on green tag" },
    { text: "#ffffff", bg: "#8b5cf6", label: "White text on purple tag" },
    { text: "#ffffff", bg: "#f59e0b", label: "White text on amber tag" },
    { text: "#ffffff", bg: "#6b7280", label: "White text on gray tag" },
    { text: "#ffffff", bg: "#ef4444", label: "White text on red tag" },
    { text: "#ffffff", bg: "#ec4899", label: "White text on pink tag" },

    // FanArcs brand colors
    { text: "#a997df", bg: "#2a1a6f", label: "FanArcs secondary on primary" },
    { text: "#e0d9ff", bg: "#2a1a6f", label: "Light text on FanArcs primary" },

    // Text on gradient-like surfaces (testing with solid approximation)
    { text: "#b8aeff", bg: "#330066", label: "Muted text on deep purple" },
  ];

  const results = tests.map(({ text, bg, label }) => {
    console.log(`\n📋 ${label}`);
    const fixed = ensureContrast(text, bg);
    return {
      label,
      original: text,
      background: bg,
      fixed,
      passed: fixed === text,
    };
  });

  console.log("\n📊 Summary:");
  console.log(`✅ Passed: ${results.filter((r) => r.passed).length}`);
  console.log(`🔧 Fixed: ${results.filter((r) => !r.passed).length}`);

  return results;
}

/**
 * Quick check if a color combination passes WCAG
 */
export function passesWCAG(
  textColor: string,
  bgColor: string,
  level: "AA" | "AAA" = "AA"
): boolean {
  try {
    const ratio = getContrast(textColor, bgColor);
    const required = level === "AAA" ? 7.0 : 4.5;
    return ratio >= required;
  } catch {
    return false;
  }
}

/**
 * Helper for transparent overlays - checks if content underneath could be readable
 * For semi-transparent backgrounds, you need to know what color is underneath
 *
 * @param textColor - Text color on the overlay
 * @param overlayBg - Background color of the overlay (can be semi-transparent)
 * @param contentBehind - Color of content that shows through (optional)
 * @returns Suggested fix or warning
 */
export function checkTransparentOverlay(
  textColor: string,
  overlayBg: string,
  contentBehind: string = "#ffffff"
): { passes: boolean; suggestion: string; details: string } {
  // For true transparency issues, we'd need to composite colors
  // For now, test against both extremes: the overlay bg AND what's behind

  const ratioAgainstOverlay = getContrast(textColor, overlayBg);
  const ratioAgainstBehind = getContrast(textColor, contentBehind);

  const worstCase = Math.min(ratioAgainstOverlay, ratioAgainstBehind);

  if (worstCase >= 4.5) {
    return {
      passes: true,
      suggestion: textColor,
      details: `✅ Passes WCAG AA (worst case: ${worstCase.toFixed(2)}:1)`,
    };
  }

  // Suggest making the overlay more opaque or adjusting text
  const fixedText = ensureContrast(textColor, overlayBg);
  const newRatio = getContrast(fixedText, overlayBg);

  return {
    passes: false,
    suggestion: fixedText,
    details: `⚠️ Transparent overlay issue! Worst case: ${worstCase.toFixed(
      2
    )}:1. 
Try: 
1. Make overlay background more opaque (less transparent)
2. Add backdrop-filter: blur() to separate from content behind
3. Use suggested text color: ${fixedText} (${newRatio.toFixed(2)}:1)`,
  };
}
