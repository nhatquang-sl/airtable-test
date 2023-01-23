import _ from 'lodash';
import { Op } from 'sequelize';
import { Drawing } from '@database';
import { airTableService } from '@services/airtable';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';

export class AirtableSyncDrawingsCommand implements ICommand {}

@RegisterHandler
export class AirtableSyncDrawingsCommandHandler
  implements ICommandHandler<AirtableSyncDrawingsCommand, void>
{
  async handle(command: AirtableSyncDrawingsCommand): Promise<void> {
    // clear all drawings data
    await Drawing.destroy({ where: { id: { [Op.gt]: 0 } } });

    // sync drawing
    let offset = '';
    do {
      const result = await airTableService.getDrawings(offset);

      await Drawing.bulkCreate(result.records.map((d) => ({ id: d.id, name: d.name })));

      offset = result.offset;
    } while (offset);
  }
}
