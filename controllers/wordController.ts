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
            if (typeof req.query.url === 'undefined') {
                return res.status(400).json({"error": "url parameter is required"})
            }

            let limitParam: number = 0;
            if (typeof req.query.limit !== 'undefined') {
                limitParam = Number(req.query.limit) || 0;
            }

            const result = await this.wordService.getCommonWords(req.query.url as string, limitParam);

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
