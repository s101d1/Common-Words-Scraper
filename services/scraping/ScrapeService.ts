interface ScrapeService {
    /**
     * Scrape the common words found in the URL page
     * 
     * @param url URL
     * @returns Array of common words found in the URL
     */
    scrapeCommonWords: (url: string) => Promise<string[]>;
}

export default ScrapeService;
