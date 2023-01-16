import ENV from '@config';
import { Sequelize } from 'sequelize';

class DbContext {
  sequelize: Sequelize;

  constructor() {
    if (ENV.NODE_ENV === 'test')
      this.sequelize = new Sequelize('sqlite::memory:', { logging: false });
    else
      this.sequelize = new Sequelize({
        dialect: 'mssql',
        dialectModulePath: 'msnodesqlv8/lib/sequelize',
        dialectOptions: {
          // user: ENV.DB_USERNAME,
          // password: ENV.DB_PASSWORD,
          // database: ENV.DB_NAME,
          options: {
            driver: '',
            connectionString: `Server=.;Database=airtabledb;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};`,
            trustedConnection: true,
            instanceName: '',
          },
        },
        pool: {
          min: 0,
          max: 5,
          idle: 10000,
        },
        logging: false,
      });
  }

  /**
   * Connects to database
   */
  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connected to database');
    } catch (e: any) {
      console.log('Occured error when connecting to database. Error:', e.message);
    }
  }
}

const dbContext = new DbContext();

export default dbContext;
