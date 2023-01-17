import { mediator } from '@application/mediator';
import { AirtableSyncModelsCommand } from '@application/handlers/airtable/sync-models';
import { AirtableSyncDrawingsCommand } from '@application/handlers/airtable/sync-drawing';
import { AirtableSyncServicesCommand } from '@application/handlers/airtable/sync-services';

export default class SyncModelWorker {
  run = async () => {
    await mediator.send(new AirtableSyncModelsCommand());
    await mediator.send(new AirtableSyncDrawingsCommand());
    await mediator.send(new AirtableSyncServicesCommand());
  };
}
