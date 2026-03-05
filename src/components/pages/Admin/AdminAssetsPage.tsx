import { useState, useEffect } from "react";
import { adminService, PAGE_SECTIONS } from "../../../services/adminService";
import { SiteAsset, AssetType } from "../../../types";
import { useAuth } from "../../../FaShared/hooks/useAuth";

type ViewMode = "gallery" | "upload" | "assigned";

export const AdminAssetsPage = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");

  // Gallery state
  const [assets, setAssets] = useState<SiteAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadAssetType, setUploadAssetType] = useState<AssetType>("hero");
  const [uploadAltText, setUploadAltText] = useState("");
  const [uploadPageSection, setUploadPageSection] = useState("");

  // Selection state
  const [selectedAsset, setSelectedAsset] = useState<SiteAsset | null>(null);
  const [assigningSection, setAssigningSection] = useState<string>("");

  // Load assets on mount
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAssets();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadFile) {
      alert("Please select a file");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      await adminService.uploadAsset({
        file: uploadFile,
        assetType: uploadAssetType,
        altText: uploadAltText || undefined,
        pageSection: uploadPageSection || undefined,
      });

      // Reset form
      setUploadFile(null);
      setUploadPreview(null);
      setUploadAltText("");
      setUploadPageSection("");

      // Reload assets
      await loadAssets();

      alert("Asset uploaded successfully!");
      setViewMode("gallery");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle asset selection
  const handleAssetClick = (asset: SiteAsset) => {
    setSelectedAsset(asset);
  };

  // Handle assigning asset to section
  const handleAssignToSection = async () => {
    if (!selectedAsset || !assigningSection) {
      alert("Please select an asset and a page section");
      return;
    }

    try {
      await adminService.assignAssetToSection(
        selectedAsset.id,
        assigningSection,
      );
      alert(`Asset assigned to ${assigningSection}`);
      setAssigningSection("");
      setSelectedAsset(null);
      await loadAssets();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign asset");
    }
  };

  // Handle delete
  const handleDelete = async (assetId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this asset? This cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await adminService.deleteAsset(assetId);
      alert("Asset deleted successfully");
      if (selectedAsset?.id === assetId) {
        setSelectedAsset(null);
      }
      await loadAssets();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete asset");
    }
  };

  // Get assigned assets grouped by section
  const assignedAssets = assets.filter((a) => a.page_section);
  const unassignedAssets = assets.filter((a) => !a.page_section);

  if (!user) {
    return (
      <div className="admin-assets-page">
        <h1>Access Denied</h1>
        <p>You must be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-assets-page">
      <header className="admin-header">
        <h1>Site Assets Manager</h1>
        <p>Manage images and media for your site</p>
      </header>

      {/* View Mode Toggle */}
      <nav className="admin-nav">
        <button
          className={viewMode === "gallery" ? "active" : ""}
          onClick={() => setViewMode("gallery")}
        >
          All Assets ({assets.length})
        </button>
        <button
          className={viewMode === "upload" ? "active" : ""}
          onClick={() => setViewMode("upload")}
        >
          Upload New
        </button>
        <button
          className={viewMode === "assigned" ? "active" : ""}
          onClick={() => setViewMode("assigned")}
        >
          Assigned ({assignedAssets.length})
        </button>
      </nav>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Gallery View */}
      {viewMode === "gallery" && (
        <div className="gallery-view">
          <h2>All Assets</h2>

          {loading ? (
            <p>Loading assets...</p>
          ) : assets.length === 0 ? (
            <p>
              No assets uploaded yet. Upload your first asset to get started!
            </p>
          ) : (
            <>
              <div className="assets-grid">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`asset-card ${selectedAsset?.id === asset.id ? "selected" : ""}`}
                    onClick={() => handleAssetClick(asset)}
                  >
                    <div className="asset-image">
                      <img
                        src={asset.public_url}
                        alt={asset.alt_text || asset.file_name}
                      />
                    </div>
                    <div className="asset-info">
                      <p className="asset-filename">{asset.file_name}</p>
                      <p className="asset-type">{asset.asset_type}</p>
                      {asset.page_section && (
                        <p className="asset-section">📍 {asset.page_section}</p>
                      )}
                      {asset.width && asset.height && (
                        <p className="asset-dimensions">
                          {asset.width} × {asset.height}
                        </p>
                      )}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(asset.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Asset Assignment Panel */}
              {selectedAsset && (
                <div className="assignment-panel">
                  <h3>Assign to Page Section</h3>
                  <p>
                    Selected: <strong>{selectedAsset.file_name}</strong>
                  </p>
                  {selectedAsset.page_section && (
                    <p>
                      Currently assigned to:{" "}
                      <strong>{selectedAsset.page_section}</strong>
                    </p>
                  )}

                  <div className="assignment-form">
                    <select
                      value={assigningSection}
                      onChange={(e) => setAssigningSection(e.target.value)}
                    >
                      <option value="">Select a page section...</option>
                      <optgroup label="Hero Images">
                        <option value={PAGE_SECTIONS.HOME_HERO}>
                          Home Hero
                        </option>
                        <option value={PAGE_SECTIONS.ANIME_HERO}>
                          Anime Hero
                        </option>
                        <option value={PAGE_SECTIONS.COMICS_HERO}>
                          Comics Hero
                        </option>
                        <option value={PAGE_SECTIONS.MANGA_HERO}>
                          Manga Hero
                        </option>
                        <option value={PAGE_SECTIONS.TV_HERO}>TV Hero</option>
                        <option value={PAGE_SECTIONS.GAMES_HERO}>
                          Games Hero
                        </option>
                        <option value={PAGE_SECTIONS.WORLDS_HERO}>
                          Worlds Hero
                        </option>
                      </optgroup>
                      <optgroup label="Branding">
                        <option value={PAGE_SECTIONS.SITE_LOGO}>
                          Site Logo
                        </option>
                        <option value={PAGE_SECTIONS.SITE_FAVICON}>
                          Site Favicon
                        </option>
                      </optgroup>
                    </select>
                    <button
                      onClick={handleAssignToSection}
                      disabled={!assigningSection}
                    >
                      Assign
                    </button>
                    <button onClick={() => setSelectedAsset(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Upload View */}
      {viewMode === "upload" && (
        <div className="upload-view">
          <h2>Upload New Asset</h2>

          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label htmlFor="file-upload">Select Image</label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </div>

            {uploadPreview && (
              <div className="upload-preview">
                <img src={uploadPreview} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="asset-type">Asset Type</label>
              <select
                id="asset-type"
                value={uploadAssetType}
                onChange={(e) =>
                  setUploadAssetType(e.target.value as AssetType)
                }
              >
                <option value="hero">Hero Image</option>
                <option value="logo">Logo</option>
                <option value="banner">Banner</option>
                <option value="icon">Icon</option>
                <option value="thumbnail">Thumbnail</option>
                <option value="background">Background</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="alt-text">Alt Text (Optional)</label>
              <input
                id="alt-text"
                type="text"
                value={uploadAltText}
                onChange={(e) => setUploadAltText(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>

            <div className="form-group">
              <label htmlFor="page-section">
                Assign to Page Section (Optional)
              </label>
              <select
                id="page-section"
                value={uploadPageSection}
                onChange={(e) => setUploadPageSection(e.target.value)}
              >
                <option value="">Don't assign yet</option>
                <optgroup label="Hero Images">
                  <option value={PAGE_SECTIONS.HOME_HERO}>Home Hero</option>
                  <option value={PAGE_SECTIONS.ANIME_HERO}>Anime Hero</option>
                  <option value={PAGE_SECTIONS.COMICS_HERO}>Comics Hero</option>
                  <option value={PAGE_SECTIONS.MANGA_HERO}>Manga Hero</option>
                  <option value={PAGE_SECTIONS.TV_HERO}>TV Hero</option>
                  <option value={PAGE_SECTIONS.GAMES_HERO}>Games Hero</option>
                  <option value={PAGE_SECTIONS.WORLDS_HERO}>Worlds Hero</option>
                </optgroup>
                <optgroup label="Branding">
                  <option value={PAGE_SECTIONS.SITE_LOGO}>Site Logo</option>
                  <option value={PAGE_SECTIONS.SITE_FAVICON}>
                    Site Favicon
                  </option>
                </optgroup>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={!uploadFile || uploading}>
                {uploading ? "Uploading..." : "Upload Asset"}
              </button>
              <button type="button" onClick={() => setViewMode("gallery")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assigned View */}
      {viewMode === "assigned" && (
        <div className="assigned-view">
          <h2>Assigned Assets</h2>

          {assignedAssets.length === 0 ? (
            <p>No assets assigned to page sections yet.</p>
          ) : (
            <div className="assigned-list">
              {assignedAssets.map((asset) => (
                <div key={asset.id} className="assigned-item">
                  <div className="assigned-image">
                    <img
                      src={asset.public_url}
                      alt={asset.alt_text || asset.file_name}
                    />
                  </div>
                  <div className="assigned-details">
                    <h3>{asset.page_section}</h3>
                    <p>{asset.file_name}</p>
                    <p className="assigned-meta">
                      {asset.asset_type} • {asset.width} × {asset.height}
                    </p>
                  </div>
                  <button onClick={() => handleAssetClick(asset)}>
                    Edit Assignment
                  </button>
                </div>
              ))}
            </div>
          )}

          <h3>Unassigned Assets ({unassignedAssets.length})</h3>
          {unassignedAssets.length > 0 && (
            <div className="unassigned-grid">
              {unassignedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="asset-card-small"
                  onClick={() => handleAssetClick(asset)}
                >
                  <img
                    src={asset.public_url}
                    alt={asset.alt_text || asset.file_name}
                  />
                  <p>{asset.file_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAssetsPage;
