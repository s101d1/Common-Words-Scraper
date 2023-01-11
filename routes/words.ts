import { Router } from 'express';
import WordController from '../controllers/wordController';
import WordService from '../services/words/wordService';
import StringUtil from '../utils/stringUtil';
import JsonUtil from '../utils/jsonUtil';
import PuppeteerScrapeService from '../services/scraping/PuppeteerScrapeService';

export const wordsRouter = Router();

const puppeteerScrapeService = new PuppeteerScrapeService();
const jsonUtil = new JsonUtil();
const stringUtil = new StringUtil();
const wordService = new WordService(puppeteerScrapeService, jsonUtil, stringUtil);
const wordController = new WordController(wordService);

wordsRouter.get('/', wordController.listWords);
