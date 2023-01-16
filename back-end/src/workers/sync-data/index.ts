import { mediator } from '@application/mediator';
import { AirtableSyncModelsCommand } from '@application/handlers/airtable/sync-models';

export default class SyncModelWorker {
  run = async () => {
    await mediator.send(new AirtableSyncModelsCommand());
  };
}
