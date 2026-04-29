/**
 * Simple in-memory cache for data service
 * Prevents repeated API calls for the same data
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expires: number;
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get cached data or execute fetch function
   */
  async get<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = this.defaultTTL,
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    // Return cached data if still valid
    if (cached && now < cached.expires) {
      return cached.data;
    }

    // Fetch fresh data
    try {
      const data = await fetchFn();
      this.cache.set(key, {
        data,
        timestamp: now,
        expires: now + ttl,
      });
      return data;
    } catch (error) {
      // If we have stale data and fetch fails, return stale data
      if (cached) {
        console.warn(`Using stale cache data for ${key}`, error);
        return cached.data;
      }
      throw error;
    }
  }

  /**
   * Manually invalidate cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate cache entries matching pattern
   */
  invalidatePattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats for debugging
   */
  stats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now >= entry.expires) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.debug(`Cache CLEANUP: removed ${cleaned} expired entries`);
    }
  }

  /**
   * Invalidate all sections for a specific wiki page
   */
  invalidateWikiPageSections(pageId: string): void {
    this.invalidatePattern(`wiki-section-${pageId}`);
  }

  /**
   * Invalidate a specific wiki page section
   */
  invalidateWikiPageSection(pageId: string, sectionId: string): void {
    this.invalidate(`wiki-section-${pageId}-${sectionId}`);
  }

  /**
   * Invalidate wiki page and all its sections
   */
  invalidateWikiPage(pageIdOrPath: string): void {
    // Invalidate the page itself
    this.invalidate(`wiki-page-${pageIdOrPath}`);
    // Invalidate all sections (both singular and plural patterns)
    this.invalidatePattern(`wiki-sections-${pageIdOrPath}`); // Plural for loadWikiPageSections
    this.invalidatePattern(`wiki-sections-html-${pageIdOrPath}`); // Rendered HTML cache
    this.invalidatePattern(`wiki-sections-meta-${pageIdOrPath}`); // Render metadata cache
    this.invalidatePattern(`wiki-section-${pageIdOrPath}`); // Singular for individual sections
    // Invalidate contributors (both path-based and id-based)
    this.invalidate(`wiki-contributors-${pageIdOrPath}`);
    this.invalidate(`wiki-contributors-id-${pageIdOrPath}`);
  }
}

// Export singleton instance
export const cache = new SimpleCache();

// Auto-cleanup every 10 minutes
setInterval(() => cache.cleanup(), 10 * 60 * 1000);

// Expose cache globally for debugging (only in development)
if (typeof window !== "undefined" && import.meta.env.DEV) {
  (window as any).__cache = cache;
}

/**
 * Helper function for easy caching
 */
export const withCache = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number,
): Promise<T> => {
  return cache.get(key, fetchFn, ttl);
};

export default cache;
