import { RegisterHandler, ICommandHandler, ICommand } from '@application/mediator';
import { Service } from '@database';

export class AirtableGetServicesCommand implements ICommand {}

export class ServiceDto {
  id: string = '';
  name: string = '';
  startDate: number = 0;
  endDate: number = 0;
}

@RegisterHandler
export class AirtableGetServicesCommandHandler
  implements ICommandHandler<AirtableGetServicesCommand, ServiceDto[]>
{
  async handle(command: AirtableGetServicesCommand): Promise<ServiceDto[]> {
    const services = await Service.findAll();
    const startDate = new Date();
    return services.map((s) => {
      const dto = { id: s.id, name: s.name, startDate: startDate.getTime() } as ServiceDto;

      // calculate end date by running hours interval
      if (s.runningHoursInterval) {
        let endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + s.runningHoursInterval);
        console.log(s.runningHoursInterval, endDate);
        dto.endDate = endDate.getTime();
      }

      // calculate end date for calendar interval
      if (s.calendarIntervalUnit) {
        let endDate = new Date(startDate);
        switch (s.calendarIntervalUnit) {
          case 'year':
            endDate.setFullYear(endDate.getFullYear() + s.calendarInterval);
            break;
          case 'month':
            endDate.setMonth(endDate.getMonth() + s.calendarInterval);
            break;
          case 'day':
            endDate.setDate(endDate.getDate() + s.calendarInterval);
            break;
        }
        // set end date if the current end date not yet assign
        // or the current end date greater than new end date
        if (!dto.endDate || dto.endDate > endDate.getTime()) {
          dto.endDate = endDate.getTime();
        }
      }

      return dto;
    });
  }
}
