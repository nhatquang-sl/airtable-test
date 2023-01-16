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

export class ModelModelDto {
  number: string = '';
  parentNumber: string = '';

  constructor(number: string, parentNumber: string) {
    this.number = number;
    this.parentNumber = parentNumber;
  }
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

  getModelModel = async (offset: string = ''): Promise<AirtableResponse<ModelModelDto>> => {
    let requestPath = `/v0/${ENV.AIRTABLE_BASE_ID}/tblvynl4I3DUZCooo`;
    if (offset) requestPath += `?offset=${offset}`;

    var res = await this.api.get(requestPath);

    const result = new AirtableResponse<ModelModelDto>(res.data.offset);
    for (const record of res.data.records) {
      const { number, parent_number } = record.fields;

      if (number?.length && parent_number?.length) {
        for (const num of number) {
          for (const parentNum of parent_number) {
            result.records.push(new ModelModelDto(num, parentNum));
          }
        }
      }
    }

    return result;
  };
}

export const airTableService = new AirTableService();
