import { createContext, useContext, useEffect, useState } from "react";
import { adminService } from "../services/adminService";
import { SiteAsset } from "../types";

/**
 * Page Assets - All site hero images and branding assets
 * Fetched once at app startup and provided to all pages via context
 */
export interface PageAssets {
  homeHero: SiteAsset | null;
  animeHero: SiteAsset | null;
  mangaHero: SiteAsset | null;
  comicsHero: SiteAsset | null;
  tvHero: SiteAsset | null;
  gamesHero: SiteAsset | null;
  worldsHero: SiteAsset | null;
  siteLogo: SiteAsset | null;
  siteFavicon: SiteAsset | null;
  loading: boolean;
  error: string | null;
}

const AssetContext = createContext<PageAssets | null>(null);

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, setAssets] = useState<PageAssets>({
    homeHero: null,
    animeHero: null,
    mangaHero: null,
    comicsHero: null,
    tvHero: null,
    gamesHero: null,
    worldsHero: null,
    siteLogo: null,
    siteFavicon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const [home, anime, manga, comics, tv, games, worlds, logo, favicon] =
          await Promise.all([
            adminService.getPageSectionAsset("home-hero"),
            adminService.getPageSectionAsset("anime-hero"),
            adminService.getPageSectionAsset("manga-hero"),
            adminService.getPageSectionAsset("comics-hero"),
            adminService.getPageSectionAsset("tv-hero"),
            adminService.getPageSectionAsset("games-hero"),
            adminService.getPageSectionAsset("worlds-hero"),
            adminService.getPageSectionAsset("site-logo"),
            adminService.getPageSectionAsset("site-favicon"),
          ]);

        setAssets({
          homeHero: home,
          animeHero: anime,
          mangaHero: manga,
          comicsHero: comics,
          tvHero: tv,
          gamesHero: games,
          worldsHero: worlds,
          siteLogo: logo,
          siteFavicon: favicon,
          loading: false,
          error: null,
        });
      } catch (err) {
        setAssets((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load assets",
        }));
      }
    };

    fetchAssets();
  }, []);

  return (
    <AssetContext.Provider value={assets}>{children}</AssetContext.Provider>
  );
};

/**
 * Hook to access all page assets
 * Must be used within an AssetProvider
 */
export const usePageAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("usePageAssets must be used within AssetProvider");
  }
  return context;
};
