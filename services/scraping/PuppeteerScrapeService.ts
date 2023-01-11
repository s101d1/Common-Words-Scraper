import ScrapeService from "./ScrapeService";

const puppeteer = require('puppeteer');

class PuppeteerScrapeService implements ScrapeService {

    public async scrapeCommonWords(url: string): Promise<string[]> {
        const browser = await puppeteer.launch({headless: true});
        
        try {
            const page = await browser.newPage();
    
            await page.goto(url, { waitUntil: 'domcontentloaded' });
    
            const data = await page.content();
    
            await page.evaluate(() => {
                for (const e of document.body.querySelectorAll('script')) e.remove();
                for (const e of document.body.querySelectorAll('style')) e.remove();
                for (const e of document.body.querySelectorAll('img')) e.remove();
                for (const e of document.body.querySelectorAll('noscript')) e.remove();
            });
    
            const words = [];
    
            const nodes = await page.$x('//body/descendant-or-self::*/text()');
            for (const node of nodes) { 
                const nodeValue = (await page.evaluate((el: Node) => el.nodeValue, node)).trim();
                if (nodeValue != '') {
                    words.push(nodeValue);
                }
            }
            
            return words;
        } catch (err) {
            const e = err as Error;
            console.log(e.stack);
            throw Error('Error in scraping common words: ' + e);
        }
        finally {
            await browser.close();
        }

    }    
}

export default PuppeteerScrapeService;
