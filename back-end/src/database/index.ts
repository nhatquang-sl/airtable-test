import dbContext from './db-context';
import MainModel, { ModelModel } from './models/model';

const initializeDb = async () => {
  try {
    await dbContext.sequelize.sync({ force: true });
  } catch (err) {
    console.log({ err });
  }
};
export { dbContext, initializeDb, MainModel, ModelModel };
