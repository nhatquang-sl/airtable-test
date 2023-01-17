import express, { Request, Response } from 'express';
import { mediator } from '@application/mediator';
import { AirtableGetModelsCommand } from '@application/handlers/airtable/get-models';
import { AirtableGetDrawingsCommand } from '@application/handlers/airtable/get-drawings';
import { AirtableGetServicesCommand } from '@application/handlers/airtable/get-services';

const router = express.Router();

router.get('/models', async (request: Request, response: Response) => {
  response.json(await mediator.send(new AirtableGetModelsCommand()));
});

router.get('/drawings', async (request: Request, response: Response) => {
  response.json(await mediator.send(new AirtableGetDrawingsCommand()));
});

router.get('/services', async (request: Request, response: Response) => {
  response.json(await mediator.send(new AirtableGetServicesCommand()));
});

export default router;
