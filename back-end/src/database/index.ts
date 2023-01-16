import dbContext from './db-context';
import MainModel, { ModelModel } from './models/model';
import Drawing from './models/drawing';
import DrawingModel from './models/drawing-model';

const initializeDb = async () => {
  try {
    await dbContext.sequelize.sync({ force: true });
  } catch (err) {
    console.log({ err });
  }
};
export { dbContext, initializeDb, MainModel, ModelModel, Drawing, DrawingModel };
