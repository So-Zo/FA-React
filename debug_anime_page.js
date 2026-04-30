// Quick test to debug the WikiPageService issue
// Run this in the browser console to see what's happening

import { WikiPageService } from "./src/services/WikiPageService";

// Test loading the anime page
WikiPageService.loadWikiPage("/anime")
  .then((page) => {
    console.log("SUCCESS: Loaded anime page:", page);
  })
  .catch((error) => {
    console.log("ERROR loading anime page:", error);
  });

// Also test what's in the database
import { supabase } from "./src/lib/supabaseClient";

supabase
  .from("wiki_pages")
  .select("id, title, full_path, page_type")
  .eq("full_path", "/anime")
  .single()
  .then(({ data, error }) => {
    console.log("Direct query result:", { data, error });
  });
