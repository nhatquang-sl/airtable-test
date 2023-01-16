import express, { Request, Response } from 'express';
import { mediator } from '@application/mediator';
import { AirtableGetModelsCommand } from '@application/handlers/airtable/get-models';

const router = express.Router();

router.get('/models', async (request: Request, response: Response) => {
  response.json(await mediator.send(new AirtableGetModelsCommand()));
});

export default router;
