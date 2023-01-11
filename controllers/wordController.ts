import { Request, Response } from 'express';
import WordService from '../services/words/wordService';

const puppeteer = require('puppeteer');

class WordController {
    private wordService: WordService;

    constructor(wordService: WordService) {
        this.wordService = wordService;
    }

    public listWords = async (req: Request, res: Response) => {
        try {
            const { url } = req.query;
            if (typeof url !== "string") {
                throw new Error("Query param 'url' has to be of type string");
            }

            const result = await this.wordService.getCommonWords(url);

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(result);
        } catch (err) {
            const e = err as Error;
            console.log(e.stack);
            res.status(500).json({"error": "Internal Server Error."});
        }
    };
    
}

export default WordController;
