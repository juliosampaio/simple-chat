import { Injector } from '../utils/injector.util';

export const Inject = <T extends { new (...args: any[]): {} }>(constructor: T) => (
  target: Object,
  key: string,
) => {
  const injections = Reflect.getMetadata('injections', target.constructor) || {};
  injections[key] = { constructor };
  Reflect.defineMetadata('injections', injections, target.constructor);
};

// export const Inject = <T extends { new (...args: any[]): {} }>(constructor: T) => (
//   target: Object,
//   propertyKey: string | symbol,
//   parameterIndex: number,
// ) => {
//   const injections = Reflect.getMetadata('injections', target) || {};
//   injections[parameterIndex] = { parameterIndex, constructor };
//   Reflect.defineMetadata('injections', injections, target);
// };
