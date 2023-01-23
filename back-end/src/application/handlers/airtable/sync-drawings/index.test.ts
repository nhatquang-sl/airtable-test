import { dbContext, initializeDb, Drawing } from '@database';
import { mediator } from '@application/mediator';
import { AirtableSyncDrawingsCommand } from '.';
import testData from './index.test.data.json';
import api from '@services/airtable/api';
//mock the instance from api
// https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/
// https://stackoverflow.com/questions/73034687/solved-mocking-axios-with-custom-error-in-jest-and-typescript
jest.mock('@services/airtable/api');
const mockedAxiosInstance = api as jest.MockedFunction<typeof api>;

beforeAll(async () => {
  await dbContext.connect();
  await initializeDb();
  (mockedAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
    data: testData,
  });
});

test('sync drawings success', async () => {
  await mediator.send(new AirtableSyncDrawingsCommand());

  const models = await Drawing.findAll();

  expect(models.length).toBe(3);
  expect(models[0].id).toBe('rec1U1h6688htdXuY');
  expect(models[0].name).toBe('RRM000371630');

  expect(models[1].id).toBe('recH2AZ8i92zHOP8v');
  expect(models[1].name).toBe('RRM000371625');

  expect(models[2].id).toBe('recHQTrJICAReTql1');
  expect(models[2].name).toBe('131125');
});
