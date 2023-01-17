import { Op } from 'sequelize';
import { Service } from '@database';
import { airTableService } from '@services/airtable';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';

export class AirtableSyncServicesCommand implements ICommand {}

@RegisterHandler
export class AirtableSyncServicesCommandHandler
  implements ICommandHandler<AirtableSyncServicesCommand, void>
{
  async handle(command: AirtableSyncServicesCommand): Promise<void> {
    // clear all services data
    await Service.destroy({ where: { id: { [Op.gt]: 0 } } });

    // sync services
    let offset = '';
    do {
      const result = await airTableService.getServices(offset);
      await Service.bulkCreate(result.records.map((x) => x));
      offset = result.offset;
    } while (offset);
  }
}
