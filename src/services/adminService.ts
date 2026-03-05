import { supabase } from "../lib/supabaseClient";
import {
  SiteAsset,
  AssetType,
  UploadAssetParams,
  UpdateAssetParams,
} from "../types";

// File upload configurations
const SITE_ASSET_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"],
};

// Page sections for easy reference
export const PAGE_SECTIONS = {
  HOME_HERO: "home-hero",
  ANIME_HERO: "anime-hero",
  COMICS_HERO: "comics-hero",
  MANGA_HERO: "manga-hero",
  TV_HERO: "tv-hero",
  GAMES_HERO: "games-hero",
  WORLDS_HERO: "worlds-hero",
  SITE_LOGO: "site-logo",
  SITE_FAVICON: "site-favicon",
} as const;

// File validation helper
function validateFile(file: File) {
  // Check file size
  if (file.size > SITE_ASSET_CONFIG.maxSize) {
    throw new Error(
      `File size must be less than ${SITE_ASSET_CONFIG.maxSize / (1024 * 1024)}MB`,
    );
  }

  // Check MIME type
  if (!SITE_ASSET_CONFIG.allowedTypes.includes(file.type)) {
    throw new Error(
      `File type ${file.type} is not allowed. Allowed types: ${SITE_ASSET_CONFIG.allowedTypes.join(", ")}`,
    );
  }

  // Check file extension
  const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
  if (!SITE_ASSET_CONFIG.allowedExtensions.includes(fileExt)) {
    throw new Error(
      `File extension ${fileExt} is not allowed. Allowed extensions: ${SITE_ASSET_CONFIG.allowedExtensions.join(", ")}`,
    );
  }
}

// Get image dimensions from file
async function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export const adminService = {
  /**
   * Upload a new site asset to storage and create database record
   */
  async uploadAsset({
    file,
    assetType,
    altText,
    pageSection,
  }: UploadAssetParams): Promise<SiteAsset> {
    // Validate file
    validateFile(file);

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("You must be logged in to upload assets");
    }

    // Get image dimensions
    let dimensions: { width: number; height: number } | null = null;
    try {
      dimensions = await getImageDimensions(file);
    } catch (err) {
      console.warn("Could not get image dimensions:", err);
    }

    // Generate unique file path
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const filePath = `${assetType}/${timestamp}-${random}.${fileExt}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("site-assets")
      .getPublicUrl(filePath);

    // Create database record
    const { data: asset, error: dbError } = await supabase
      .from("site-assets")
      .insert({
        file_name: file.name,
        storage_path: filePath,
        public_url: publicUrlData.publicUrl,
        asset_type: assetType,
        page_section: pageSection || null,
        alt_text: altText || null,
        width: dimensions?.width,
        height: dimensions?.height,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (dbError) {
      // Try to clean up uploaded file if database insert fails
      await supabase.storage.from("site-assets").remove([filePath]);
      throw new Error(`Database error: ${dbError.message}`);
    }

    return asset as SiteAsset;
  },

  /**
   * Get all site assets, optionally filtered by type or section
   */
  async getAssets(filters?: {
    assetType?: AssetType;
    pageSection?: string;
    limit?: number;
  }): Promise<SiteAsset[]> {
    let query = supabase
      .from("site-assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.assetType) {
      query = query.eq("asset_type", filters.assetType);
    }

    if (filters?.pageSection) {
      query = query.eq("page_section", filters.pageSection);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch assets: ${error.message}`);
    }

    return (data as SiteAsset[]) || [];
  },

  /**
   * Get a single asset by ID
   */
  async getAssetById(assetId: string): Promise<SiteAsset | null> {
    const { data, error } = await supabase
      .from("site-assets")
      .select("*")
      .eq("id", assetId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      throw new Error(`Failed to fetch asset: ${error.message}`);
    }

    return data as SiteAsset;
  },

  /**
   * Get the current asset assigned to a page section
   */
  async getPageSectionAsset(pageSection: string): Promise<SiteAsset | null> {
    const { data, error } = await supabase
      .from("site-assets")
      .select("*")
      .eq("page_section", pageSection)
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      throw new Error(`Failed to fetch page section asset: ${error.message}`);
    }

    return data as SiteAsset;
  },

  /**
   * Update asset metadata (alt text, page section assignment, etc.)
   */
  async updateAsset({
    assetId,
    altText,
    pageSection,
    assetType,
  }: UpdateAssetParams): Promise<SiteAsset> {
    const updates: Partial<SiteAsset> = {};

    if (altText !== undefined) updates.alt_text = altText;
    if (pageSection !== undefined) updates.page_section = pageSection;
    if (assetType !== undefined) updates.asset_type = assetType;

    const { data, error } = await supabase
      .from("site-assets")
      .update(updates)
      .eq("id", assetId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update asset: ${error.message}`);
    }

    return data as SiteAsset;
  },

  /**
   * Assign an asset to a page section (and clear any other asset from that section)
   */
  async assignAssetToSection(
    assetId: string,
    pageSection: string,
  ): Promise<void> {
    // First, clear the page_section from any other asset that has it
    await supabase
      .from("site-assets")
      .update({ page_section: null })
      .eq("page_section", pageSection)
      .neq("id", assetId);

    // Then assign it to this asset
    await this.updateAsset({ assetId, pageSection });
  },

  /**
   * Delete an asset (removes from storage and database)
   */
  async deleteAsset(assetId: string): Promise<void> {
    // Get asset details first
    const asset = await this.getAssetById(assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from("site-assets")
      .remove([asset.storage_path]);

    if (storageError) {
      console.warn("Failed to delete from storage:", storageError);
      // Continue anyway - we still want to delete the database record
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from("site-assets")
      .delete()
      .eq("id", assetId);

    if (dbError) {
      throw new Error(`Failed to delete asset: ${dbError.message}`);
    }
  },

  /**
   * Get assets grouped by type
   */
  async getAssetsGroupedByType(): Promise<Record<AssetType, SiteAsset[]>> {
    const assets = await this.getAssets();

    const grouped: Record<string, SiteAsset[]> = {
      hero: [],
      logo: [],
      banner: [],
      icon: [],
      thumbnail: [],
      background: [],
      other: [],
    };

    assets.forEach((asset) => {
      if (grouped[asset.asset_type]) {
        grouped[asset.asset_type].push(asset);
      }
    });

    return grouped as Record<AssetType, SiteAsset[]>;
  },

  /**
   * Get unassigned assets (not assigned to any page section)
   */
  async getUnassignedAssets(): Promise<SiteAsset[]> {
    const { data, error } = await supabase
      .from("site-assets")
      .select("*")
      .is("page_section", null)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch unassigned assets: ${error.message}`);
    }

    return (data as SiteAsset[]) || [];
  },
};
