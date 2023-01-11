import {describe, expect, it, jest} from '@jest/globals';
import WordService from '../../../../services/words/wordService';
import PuppeteerScrapeService from '../../../../services/scraping/PuppeteerScrapeService';
import JsonUtil from '../../../../utils/jsonUtil';
import StringUtil from '../../../../utils/stringUtil';


describe('Test getCommonWords', () => {
  jest.mock('../../../../services/scraping/PuppeteerScrapeService');
  jest.mock('../../../../utils/jsonUtil');
  jest.mock('../../../../utils/stringUtil');

  it('should return common words json response with correct results', async () => {
    const commonWords = ['test1', 'test2', 'test3', 'test1', 'test2'];
    const commonWordsMap = new Map(Object.entries({test1: 3, test2: 2, test3: 1}));
    const jsonResult = '{"test1": 3, "test2": 2, "test3": 1}';

    const scrapeService = new PuppeteerScrapeService();
    const jsonUtil = new JsonUtil();
    const stringUtil = new StringUtil();
    const wordService = new WordService(scrapeService, jsonUtil, stringUtil);

    const scrapeCommonWordsSpy = jest.spyOn(scrapeService, 'scrapeCommonWords');
    const processCommonWordsSpy = jest.spyOn(wordService, 'processCommonWords');
    const strMapToJsonSpy = jest.spyOn(jsonUtil, 'strMapToJson');

    scrapeCommonWordsSpy.mockImplementation(async (url) => commonWords);
    processCommonWordsSpy.mockImplementation(async (words) => commonWordsMap);
    strMapToJsonSpy.mockImplementation((strMap) => jsonResult);

    const url = 'http://www.example.com/';
    const result = await wordService.getCommonWords(url);

    expect(result).toBe(jsonResult);
    expect(scrapeCommonWordsSpy).toBeCalledTimes(1);
    expect(scrapeCommonWordsSpy).toHaveBeenCalledWith(url);
    expect(processCommonWordsSpy).toBeCalledTimes(1);
    expect(processCommonWordsSpy).toHaveBeenCalledWith(commonWords);
    expect(strMapToJsonSpy).toBeCalledTimes(1);
    expect(strMapToJsonSpy).toHaveBeenCalledWith(commonWordsMap);
  })
})


describe('Test processCommonWords', () => {
  jest.mock('../../../../services/scraping/PuppeteerScrapeService');
  jest.mock('../../../../utils/jsonUtil');

  it('should return common words map with correct results', async () => {
    const scrapeService = new PuppeteerScrapeService();
    const jsonUtil = new JsonUtil();
    const stringUtil = new StringUtil();

    const wordService = new WordService(scrapeService, jsonUtil, stringUtil);
    const words = ['test1', 'test2', 'test1', 'test3    test1@    test2', 'test1@mail.com'];

    const result = await wordService.processCommonWords(words);

    expect(result.size).toBe(5);
    expect(result.get('test1')).toBe(4);
    expect(result.get('test2')).toBe(2);
    expect(result.get('test3')).toBe(1);
    expect(result.get('mail')).toBe(1);
    expect(result.get('com')).toBe(1);
    expect(result.get('test1!')).toBe(undefined);
    expect(result.get('test4')).toBe(undefined);
  })
})
