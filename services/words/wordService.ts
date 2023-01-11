import StringUtil from "../../utils/stringUtil";
import ScrapeService from "../scraping/ScrapeService";
import JsonUtil from "../../utils/jsonUtil";

class WordService {
    private scrapeService: ScrapeService;
    private jsonUtil: JsonUtil;
    private stringUtil: StringUtil;

    constructor(scrapeService: ScrapeService, jsonUtil: JsonUtil, stringUtil: StringUtil) {
        this.scrapeService = scrapeService;
        this.jsonUtil = jsonUtil;
        this.stringUtil = stringUtil;
    }

    /**
     * Scrape the common words found in the URL page and count the number of each common words
     * and return them in JSON format.
     * 
     * @param url URL
     * @returns JSON string
     */
    public getCommonWords = async (url: string) => {
        const words = await this.scrapeService.scrapeCommonWords(url);
        const commonWordsMap = await this.processCommonWords(words);
        return this.jsonUtil.strMapToJson(commonWordsMap)
    }

    /**
     * Convert the array of common words into Map object and count the number of each common words.
     * 
     * @param words Array of common words
     * @returns Map object containing common word as key and the count as value
     */
    public processCommonWords = async (words: string[]) => {
        try {
            const commonWordsMap = new Map();
    
            for (const word of words) {
                const filteredWord = this.stringUtil.replaceNonAlphaNumChars(word, " ").trim().toLowerCase();
                const splitWords = filteredWord.split(/(\s+)/);

                for (const splitWord of splitWords) {
                    const commonWord = splitWord.trim().toLowerCase();
                    if (commonWord != '') {
                        let count = commonWordsMap.get(commonWord);
                        count = count ? count+1 : 1;
                        commonWordsMap.set(commonWord, count);
                    }
                }
            }
    
            return commonWordsMap;
        } catch (err) {
            const e = err as Error;
            console.error(e.stack);
            throw Error('Error in processing common words: ' + e);
        }
    };
}

export default WordService;
