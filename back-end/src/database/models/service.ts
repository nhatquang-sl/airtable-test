import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import dbContext from '../db-context';

// https://sequelize.org/docs/v6/other-topics/typescript/
class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
  declare id: string;
  declare name: string;
  declare calendarInterval: number;
  declare calendarIntervalUnit: string;
  declare runningHoursInterval: number;
}

// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
Service.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // allowNull defaults to true
    },
    name: {
      type: DataTypes.STRING,
    },
    calendarInterval: {
      type: DataTypes.INTEGER,
    },
    calendarIntervalUnit: {
      type: DataTypes.STRING,
    },
    runningHoursInterval: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Other model options go here
    sequelize: dbContext.sequelize, // We need to pass the connection instance
    modelName: 'service', // We need to choose the model name
    timestamps: false, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  }
);

export default Service;
