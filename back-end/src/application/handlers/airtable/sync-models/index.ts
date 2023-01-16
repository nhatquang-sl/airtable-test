import _ from 'lodash';
import { Op } from 'sequelize';
import { MainModel, ModelModel } from '@database';
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

    // sync model-model
    offset = '';
    let totalModelmodels: { childrenId: string; parentId: string }[] = [];
    do {
      const result = await airTableService.getModelModel(offset);

      let modelmodels = result.records.map((record) => ({
        childrenId: record.number,
        parentId: record.parentNumber,
      }));

      // remove duplicated model-model
      modelmodels = _.uniqWith(modelmodels, _.isEqual);
      modelmodels = _.differenceWith(modelmodels, totalModelmodels, _.isEqual);
      await ModelModel.bulkCreate(modelmodels);

      totalModelmodels = totalModelmodels.concat(modelmodels);
      offset = result.offset;
    } while (offset);
  }
}
