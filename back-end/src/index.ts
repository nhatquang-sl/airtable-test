import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ENV from '@config';
import corsOptions from '@config/cors-options';
import { mediator } from '@application/mediator';
import { CachingBehavior } from '@application/common/behaviors';
import { dbContext, initializeDb } from '@database';
import SyncModelWorker from 'workers/sync-data';

import airtableRouter from 'controllers/airtable';

console.log(ENV);
// use a global instance for all requests from HTTP
mediator.addPipelineBehavior(new CachingBehavior());

const app = express();

// Cross Origin Resource Sharing
// app.use(cors());
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// Middleware function for logging the request method and request URL
const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  console.log(`${request.method} url:: ${request.url}`);
  try {
    next();
  } catch (err) {
    console.log('------------------------------------');
  }
};
app.use(requestLogger);

const router = express.Router();
router.get('/health-check', (req, res) => {
  res.json({
    ENV: ENV.NODE_ENV,
    APP_VERSION: ENV.APP_VERSION,
  });
});
app.use('/', router);
app.use('/airtable', airtableRouter);

dbContext.connect().then(async () => {
  await initializeDb();
  app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
  await new SyncModelWorker().run();
});

export default app;
