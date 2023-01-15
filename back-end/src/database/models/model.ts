import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import dbContext from '../db-context';

// https://sequelize.org/docs/v6/other-topics/typescript/
class MainModel extends Model<InferAttributes<MainModel>, InferCreationAttributes<MainModel>> {
  declare number: string;
  declare description: string;
}

// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
MainModel.init(
  {
    number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize: dbContext.sequelize, // We need to pass the connection instance
    modelName: 'models', // We need to choose the model name
    timestamps: false, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  }
);

MainModel.belongsToMany(MainModel, {
  through: 'modelmodel',
  as: 'Children',
  foreignKey: 'ChildrenNumber',
  otherKey: 'ParentNumber',
  timestamps: false,
});
MainModel.belongsToMany(MainModel, {
  through: 'modelmodel',
  as: 'Parent',
  otherKey: 'ChildrenNumber',
  foreignKey: 'ParentNumber',
  timestamps: false,
});

export default MainModel;
