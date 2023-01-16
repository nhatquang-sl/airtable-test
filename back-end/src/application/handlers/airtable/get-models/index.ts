import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';
import { MainModel } from '@database';
import _ from 'lodash';
import { Op } from 'sequelize';

export class AirtableGetModelsCommand implements ICommand {}

export class MainModelDto {
  id: string = '';
  number: string = '';
  description: string = '';
  children: MainModelDto[] = [];
}

export class AirtableGetModelsResult {
  records: MainModelDto[] = [];
}

@RegisterHandler
export class AirtableGetModelsCommandHandler
  implements ICommandHandler<AirtableGetModelsCommand, MainModelDto[]>
{
  async handle(command: AirtableGetModelsCommand): Promise<MainModelDto[]> {
    const models = await MainModel.findAll({
      where: { rootParent: true },
      attributes: ['id'],
      include: [
        {
          model: MainModel,
          as: 'children',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const parents = await getModelsWithChildren(models.map((p) => p.id));

    return parents;
  }
}

const getModelsWithChildren = async (modelIds: string[] = []): Promise<MainModelDto[]> => {
  const models = await getModelsByIds(modelIds);

  const parents: MainModelDto[] = [];
  for (const p of models) {
    const parent = { id: p.id, number: p.number, description: p.description } as MainModelDto;

    if (p.children?.length)
      parent.children = await getModelsWithChildren(p.children.map((c) => c.id));
    parents.push(parent);
  }
  return parents;
};

const getModelsByIds = async (ids: string[] = []) => {
  const models = await MainModel.findAll({
    where: { id: { [Op.in]: ids } },
    include: [
      {
        model: MainModel,
        as: 'children',
        attributes: ['id', 'number'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return models;
};
