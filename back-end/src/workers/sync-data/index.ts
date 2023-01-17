import { mediator } from '@application/mediator';
import { AirtableSyncModelsCommand } from '@application/handlers/airtable/sync-models';
import { AirtableSyncDrawingsCommand } from '@application/handlers/airtable/sync-drawings';
import { AirtableSyncServicesCommand } from '@application/handlers/airtable/sync-services';

export default class SyncModelWorker {
  run = async () => {
    await mediator.send(new AirtableSyncModelsCommand());
    await Promise.all([
      mediator.send(new AirtableSyncDrawingsCommand()),
      mediator.send(new AirtableSyncServicesCommand()),
    ]);
  };
}
