/**
 * PAGE ASSETS CONFIGURATION
 * ===========================
 * Central reference for all page hero images and branding assets
 *
 * All assets are fetched at app startup via AssetContext and available to all pages
 * via the usePageAssets() hook
 *
 * To use an asset on a page:
 *
 * import { usePageAssets } from "../context/AssetContext";
 *
 * const { mangaHero } = usePageAssets();
 * <img src={mangaHero?.public_url} alt="Manga Hero" />
 */

/**
 * All page sections available for asset assignment
 * These match the database page_section values
 */
export const PAGE_SECTIONS = {
  HOME_HERO: "home-hero",
  ANIME_HERO: "anime-hero",
  MANGA_HERO: "manga-hero",
  COMICS_HERO: "comics-hero",
  TV_HERO: "tv-hero",
  GAMES_HERO: "games-hero",
  WORLDS_HERO: "worlds-hero",
  SITE_LOGO: "site-logo",
  SITE_FAVICON: "site-favicon",
} as const;

/**
 * Asset usage map - which page uses which asset
 *
 * Update this whenever you add an asset to a page
 */
export const ASSET_USAGE = {
  homePage: PAGE_SECTIONS.HOME_HERO,
  animePage: PAGE_SECTIONS.ANIME_HERO,
  mangaPage: PAGE_SECTIONS.MANGA_HERO,
  comicsPage: PAGE_SECTIONS.COMICS_HERO,
  tvPage: PAGE_SECTIONS.TV_HERO,
  videoGamesPage: PAGE_SECTIONS.GAMES_HERO,
  worldsUniversesPage: PAGE_SECTIONS.WORLDS_HERO,
  siteLogoHeader: PAGE_SECTIONS.SITE_LOGO,
  siteFavicon: PAGE_SECTIONS.SITE_FAVICON,
} as const;

/**
 * How to use assets in your pages:
 *
 * 1. Import the hook:
 *    import { usePageAssets } from "../context/AssetContext";
 *
 * 2. Get the assets in your component:
 *    const { mangaHero } = usePageAssets();
 *
 * 3. Use the asset URL:
 *    <img src={mangaHero?.public_url} alt="Manga Hero" />
 *
 * The asset context provides:
 * - homeHero
 * - animeHero
 * - mangaHero
 * - comicsHero
 * - tvHero
 * - gamesHero
 * - worldsHero
 * - siteLogo
 * - siteFavicon
 * - loading (boolean)
 * - error (string | null)
 */
