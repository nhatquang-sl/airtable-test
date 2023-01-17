import _ from 'lodash';
import { Op } from 'sequelize';
import { Drawing, DrawingModel, MainModel } from '@database';
import { airTableService, AirtableDrawing, AirtableModelModel } from '@services/airtable';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';

export class AirtableSyncDrawingsCommand implements ICommand {}

@RegisterHandler
export class AirtableSyncDrawingsCommandHandler
  implements ICommandHandler<AirtableSyncDrawingsCommand, void>
{
  async handle(command: AirtableSyncDrawingsCommand): Promise<void> {
    // clear all drawings data
    await Drawing.destroy({ where: { id: { [Op.gt]: 0 } } });

    // download drawing-model
    let offset = '';
    let modelmodels: AirtableModelModel[] = [];
    do {
      const result = await airTableService.getModelModel(offset);
      modelmodels = modelmodels.concat(result.records);
      offset = result.offset;
    } while (offset);

    offset = '';
    let drawings: AirtableDrawing[] = [];
    do {
      const result = await airTableService.getDrawings(offset);
      drawings = drawings.concat(result.records);
      let drawingModels = result.records
        .map((r) =>
          // filter modelmodels by record.children
          _.intersectionWith(modelmodels, r.children, (modelmodel, c) => modelmodel.id === c).map(
            (c) => ({ drawingId: r.id, modelId: c.number })
          )
        )
        .flat();
      drawingModels = _.unionWith(drawingModels, _.isEqual);

      // sync drawing
      await Drawing.bulkCreate(result.records.map((d) => ({ id: d.id, name: d.name })));

      // sync drawing-model
      await DrawingModel.bulkCreate(drawingModels);
      offset = result.offset;
    } while (offset);
  }
}
