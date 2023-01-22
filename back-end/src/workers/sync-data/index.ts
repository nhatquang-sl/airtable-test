import { mediator } from '@application/mediator';
import { AirtableSyncModelsCommand } from '@application/handlers/airtable/sync-models';
import { AirtableSyncDrawingsCommand } from '@application/handlers/airtable/sync-drawings';
import { AirtableSyncServicesCommand } from '@application/handlers/airtable/sync-services';
import { AirtableSyncModelModelCommand } from '@application/handlers/airtable/sync-model-model';

export default class SyncModelWorker {
  run = async () => {
    await Promise.all([
      mediator.send(new AirtableSyncModelsCommand()),
      mediator.send(new AirtableSyncDrawingsCommand()),
      mediator.send(new AirtableSyncServicesCommand()),
    ]);

    await mediator.send(new AirtableSyncModelModelCommand());
  };
}
