import { dbContext, initializeDb, Service } from '@database';
import { mediator } from '@application/mediator';
import { AirtableSyncServicesCommand } from '.';
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

test('sync services success', async () => {
  await mediator.send(new AirtableSyncServicesCommand());

  const services = await Service.findAll();

  expect(services.length).toBe(3);
  expect(services[0].id).toBe('rec0E63Q229nElDf9');
  expect(services[0].name).toBe('10 year service');
  expect(services[0].calendarInterval).toBe(10);
  expect(services[0].calendarIntervalUnit).toBe('year');
  expect(services[0].runningHoursInterval).toBe(null);

  expect(services[1].id).toBe('rec1g8GyiAk97Gp2w');
  expect(services[1].name).toBe('25000 hr service');
  expect(services[1].calendarInterval).toBe(null);
  expect(services[1].calendarIntervalUnit).toBe(null);
  expect(services[1].runningHoursInterval).toBe(25000);

  expect(services[2].id).toBe('rec21SyFsJYXafVSf');
  expect(services[2].name).toBe('Quarterly inspection');
  expect(services[2].calendarInterval).toBe(3);
  expect(services[2].calendarIntervalUnit).toBe('month');
  expect(services[2].runningHoursInterval).toBe(null);
});
