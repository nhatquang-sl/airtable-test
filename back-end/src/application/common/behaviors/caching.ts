import NodeCache from 'node-cache';
import { ICommand, container, IPipelineBehavior } from '@application/mediator';

export class CachingBehavior implements IPipelineBehavior {
  // cache data in one minute
  cache = new NodeCache({ stdTTL: 60 });

  handle = async (command: ICommand, next: () => Promise<any>): Promise<any> => {
    const commandName = command.constructor.name;
    if (!container.cacheCommands.includes(commandName)) return await next();

    const cacheKey = `${commandName}_${JSON.stringify(command)}`;
    const cacheValue = this.cache.get(cacheKey);

    // store a cache key-value
    if (cacheValue === undefined) {
      const result = await next();
      this.cache.set(cacheKey, result);
      return result;
    }

    return cacheValue;
  };
}
