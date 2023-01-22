import _ from 'lodash';
import { ModelModel, DrawingModel } from '@database';
import { AirtableModelModel, airTableService } from '@services/airtable';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';

export class AirtableSyncModelModelCommand implements ICommand {}

@RegisterHandler
export class AirtableSyncModelModelCommandHandler
  implements ICommandHandler<AirtableSyncModelModelCommand, void>
{
  totalModelmodels: { childrenId: string; parentId: string }[] = [];
  totalDrawingModels: { modelId: string; drawingId: string }[] = [];
  offset = '';

  async handle(command: AirtableSyncModelModelCommand): Promise<void> {
    do {
      const result = await airTableService.getModelModel(this.offset);
      await Promise.all([
        // sync model-model
        this.syncModelModels(result.records),
        // sync drawing-model
        this.syncDrawingModels(result.records),
      ]);
      this.offset = result.offset;
    } while (this.offset);
  }

  async syncDrawingModels(records: AirtableModelModel[]) {
    let drawingmodels = records.map((record) => ({
      modelId: record.number,
      drawingId: record.drawingNo,
    }));

    // remove duplicated drawing-model
    drawingmodels = _.uniqWith(drawingmodels, _.isEqual);
    drawingmodels = _.differenceWith(drawingmodels, this.totalDrawingModels, _.isEqual);
    await DrawingModel.bulkCreate(drawingmodels);

    this.totalDrawingModels = this.totalDrawingModels.concat(drawingmodels);
  }

  async syncModelModels(records: AirtableModelModel[]) {
    let modelmodels = records.map((record) => ({
      childrenId: record.number,
      parentId: record.parentNumber,
    }));

    // remove duplicated model-model
    modelmodels = _.uniqWith(modelmodels, _.isEqual);
    modelmodels = _.differenceWith(modelmodels, this.totalModelmodels, _.isEqual);
    await ModelModel.bulkCreate(modelmodels);

    this.totalModelmodels = this.totalModelmodels.concat(modelmodels);
  }
}
