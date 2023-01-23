import { dbContext, initializeDb, MainModel } from '@database';
import { mediator } from '@application/mediator';
import { AirtableSyncModelsCommand } from '.';
import testData from './index.test.data.json';
import api from '@services/airtable/api';
//mock the instance from api
jest.mock('@services/airtable/api');
const mockedAxiosInstance = api as jest.MockedFunction<typeof api>;

beforeAll(async () => {
  await dbContext.connect();
  await initializeDb();
  (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
    data: testData,
  });
});

test('sync models success', async () => {
  await mediator.send(new AirtableSyncModelsCommand());

  const models = await MainModel.findAll();

  expect(models.length).toBe(4);
  console.log(models[3]);
  expect(models[0].id).toBe('rec03tF9Ve2fTtMej');
  expect(models[0].number).toBe('RRM000219356');
  expect(models[0].description).toBe('Mechanical Shaft Seal');
  expect(models[0].rootParent).toBe(false);

  expect(models[1].id).toBe('rec04oaaM5re9RfU5');
  expect(models[1].number).toBe('F019409');
  expect(models[1].description).toBe('Hexagon Head Screw');
  expect(models[1].rootParent).toBe(false);

  expect(models[2].id).toBe('rec05OLGcCM5jB4rL');
  expect(models[2].number).toBe('RRM000390792');
  expect(models[2].description).toBe('Bushing');
  expect(models[2].rootParent).toBe(false);

  expect(models[3].id).toBe('reclWMf0WK40CARDb');
  expect(models[3].number).toBe('112-S3');
  expect(models[3].description).toBe('Waterjet');
  expect(models[3].rootParent).toBe(true);
});
