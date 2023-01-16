import MainModel from './model';
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
class Drawing extends Model<
  InferAttributes<Drawing, { omit: 'children' }>,
  InferCreationAttributes<Drawing, { omit: 'children' }>
> {
  declare id: string;
  declare name: string;
  declare children?: NonAttribute<MainModel[]>;
  declare static associations: {
    children: Association<Drawing, MainModel>;
  };
}

// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
Drawing.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // allowNull defaults to true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize: dbContext.sequelize, // We need to pass the connection instance
    modelName: 'drawing', // We need to choose the model name
    timestamps: false, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  }
);

export default Drawing;
