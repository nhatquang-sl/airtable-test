export class ModelDto {
  id: string = '';
  number: string = '';
  description: string = '';
  open: boolean = false;
  children: ModelDto[] = [];
}