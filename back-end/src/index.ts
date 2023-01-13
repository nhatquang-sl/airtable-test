import express, { Request, Response, NextFunction } from 'express';
import ENV from '@config';
console.log(ENV);
const app = express();

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

app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));

export default app;
