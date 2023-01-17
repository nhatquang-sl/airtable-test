import axios, { AxiosInstance } from 'axios';
import ENV from '@config';

export class AirtableResponse<T> {
  constructor(offset: string) {
    this.offset = offset;
  }
  records: T[] = [];
  offset: string = '';
}

export class ModelDto {
  id: string = '';
  number: string = '';
  description: string = '';
  rootParent: boolean = false;
}

export class AirtableModelModel {
  id: string = '';
  number: string = '';
  parentNumber: string = '';

  constructor(id: string, number: string, parentNumber: string) {
    this.id = id;
    this.number = number;
    this.parentNumber = parentNumber;
  }
}

export class AirtableDrawing {
  id: string = '';
  name: string = '';
  children: string[] = [];
}

export class AirtableService {
  id: string = '';
  name: string = '';
  calendarInterval: number = 0;
  calendarIntervalUnit: string = '';
  runningHoursInterval: number = 0;
}

export class AirTableService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.airtable.com',
      headers: { Authorization: `Bearer ${ENV.AIRTABLE_API_KEY}` },
    });
  }

  getModels = async (offset: string = ''): Promise<AirtableResponse<ModelDto>> => {
    let requestPath = `/v0/${ENV.AIRTABLE_BASE_ID}/tblkEsD6MG8JVEx6K`;
    if (offset) requestPath += `?offset=${offset}`;

    var res = await this.api.get(requestPath);

    const result = new AirtableResponse<ModelDto>(res.data.offset);
    result.records = res.data.records.map((x: any) => {
      const dto = new ModelDto();
      dto.id = x.id;
      dto.number = x.fields.number;
      dto.description = x.fields.description;
      dto.rootParent = !x.fields.parents?.length;
      return dto;
    });

    return result;
  };

  getModelModel = async (offset: string = ''): Promise<AirtableResponse<AirtableModelModel>> => {
    let requestPath = `/v0/${ENV.AIRTABLE_BASE_ID}/tblvynl4I3DUZCooo`;
    if (offset) requestPath += `?offset=${offset}`;

    var res = await this.api.get(requestPath);

    const result = new AirtableResponse<AirtableModelModel>(res.data.offset);
    for (const record of res.data.records) {
      const { number, parent_number } = record.fields;

      if (number?.length && parent_number?.length) {
        for (const num of number) {
          for (const parentNum of parent_number) {
            result.records.push(new AirtableModelModel(record.id, num, parentNum));
          }
        }
      }
    }

    return result;
  };

  getDrawings = async (offset: string = ''): Promise<AirtableResponse<AirtableDrawing>> => {
    let requestPath = `/v0/${ENV.AIRTABLE_BASE_ID}/tbl3W158UCsQuemmW`;
    if (offset) requestPath += `?offset=${offset}`;

    var res = await this.api.get(requestPath);

    const result = new AirtableResponse<AirtableDrawing>(res.data.offset);
    result.records = res.data.records.map(
      (x: any) =>
        ({
          id: x.id,
          name: x.fields.name,
          children: x.fields.model_model,
        } as AirtableDrawing)
    );

    return result;
  };

  getServices = async (offset: string = ''): Promise<AirtableResponse<AirtableService>> => {
    let requestPath = `/v0/${ENV.AIRTABLE_BASE_ID}/tbl9ELh91Ys2WPnwB`;
    if (offset) requestPath += `?offset=${offset}`;

    var res = await this.api.get(requestPath);

    const result = new AirtableResponse<AirtableService>(res.data.offset);
    result.records = res.data.records.map(
      (x: any) =>
        ({
          id: x.id,
          name: x.fields.name,
          calendarInterval: x.fields.calendar_interval,
          calendarIntervalUnit: x.fields.calendar_interval_unit,
          runningHoursInterval: x.fields.running_hours_interval,
        } as AirtableService)
    );

    return result;
  };
}

export const airTableService = new AirTableService();
