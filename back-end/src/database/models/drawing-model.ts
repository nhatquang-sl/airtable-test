import { DataTypes } from 'sequelize';
import dbContext from 'database/db-context';
import Drawing from './drawing';
import MainModel from './model';

const DrawingModel = dbContext.sequelize.define(
  'drawingmodel',
  {
    drawingId: {
      type: DataTypes.STRING,
      references: {
        model: Drawing,
        key: 'id',
      },
    },
    modelId: {
      type: DataTypes.STRING,
      references: {
        model: MainModel,
        key: 'id',
      },
    },
  },
  { timestamps: false }
);
Drawing.belongsToMany(MainModel, { through: DrawingModel, onDelete: 'CASCADE' });
MainModel.belongsToMany(Drawing, { through: DrawingModel, onDelete: 'CASCADE' });

export default DrawingModel;
