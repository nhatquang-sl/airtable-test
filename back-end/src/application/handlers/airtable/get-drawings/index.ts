import _ from 'lodash';
import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';
import { Drawing, MainModel } from '@database';

export class AirtableGetDrawingsCommand implements ICommand {}

export class MainModelDto {
  id: string = '';
  number: string = '';
  description: string = '';
}

export class DrawingDto {
  id: string = '';
  name: string = '';

  models: MainModelDto[] = [];
}

export class AirtableGetModelsResult {
  records: MainModelDto[] = [];
}

@RegisterHandler
export class AirtableGetDrawingsCommandHandler
  implements ICommandHandler<AirtableGetDrawingsCommand, DrawingDto[]>
{
  async handle(command: AirtableGetDrawingsCommand): Promise<DrawingDto[]> {
    const drawings = await Drawing.findAll({
      include: [
        {
          model: MainModel,
          attributes: ['id', 'number'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return drawings.map((d) => {
      const drawing = { id: d.id, name: d.name } as DrawingDto;
      drawing.models = d.models?.map((m) => ({ id: m.id, number: m.number } as MainModelDto)) ?? [];
      return drawing;
    });
  }
}
