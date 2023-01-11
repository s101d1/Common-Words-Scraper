import { Router } from 'express';
export const indexRouter = Router();

indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
