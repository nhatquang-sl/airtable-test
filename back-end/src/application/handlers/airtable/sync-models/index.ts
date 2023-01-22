import _ from 'lodash';
import { Op } from 'sequelize';
import { MainModel } from '@database';
import { airTableService } from '@services/airtable';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';

export class AirtableSyncModelsCommand implements ICommand {}

@RegisterHandler
export class AirtableSyncModelsCommandHandler
  implements ICommandHandler<AirtableSyncModelsCommand, void>
{
  async handle(command: AirtableSyncModelsCommand): Promise<void> {
    // clear all models data
    await MainModel.destroy({ where: { id: { [Op.gt]: 0 } } });

    // sync models
    let offset = '';
    do {
      const result = await airTableService.getModels(offset);
      await MainModel.bulkCreate(result.records.map((x) => x));
      offset = result.offset;
    } while (offset);
  }
}
