import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Association,
} from 'sequelize';
import dbContext from '../db-context';

// https://sequelize.org/docs/v6/other-topics/typescript/
class MainModel extends Model<
  InferAttributes<MainModel, { omit: 'children' }>,
  InferCreationAttributes<MainModel, { omit: 'children' }>
> {
  declare id: string;
  declare number: string;
  declare description: string;
  declare rootParent: boolean;
  declare children?: NonAttribute<MainModel[]>;
  declare static associations: {
    children: Association<MainModel, MainModel>;
  };
}

// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
MainModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // allowNull defaults to true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false, // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
    },
    rootParent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    sequelize: dbContext.sequelize, // We need to pass the connection instance
    modelName: 'models', // We need to choose the model name
    timestamps: false, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  }
);

export const ModelModel = dbContext.sequelize.define(
  'modelmodel',
  {
    childrenId: {
      type: DataTypes.STRING,
      references: {
        model: MainModel, // 'users' would also work
        key: 'id',
      },
    },
    parentId: {
      type: DataTypes.STRING,
      references: {
        model: MainModel, // 'Roles' would also work
        key: 'id',
      },
    },
  },
  { timestamps: false }
);
MainModel.belongsToMany(MainModel, {
  through: ModelModel,
  as: 'parent',
  foreignKey: 'childrenId',
  otherKey: 'parentId',
  onDelete: 'CASCADE',
});
MainModel.belongsToMany(MainModel, {
  through: ModelModel,
  as: 'children',
  foreignKey: 'parentId',
  otherKey: 'childrenId',
  onDelete: 'CASCADE',
});
export default MainModel;
