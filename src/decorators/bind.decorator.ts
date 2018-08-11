/**
 * Registers the constructor to be injected into the property value when a new
 * instance is created for classes using the @Inject decorator
 * @param constructor The concret constructor to be used in the injection process
 * @see Inject
 */
export const Bind = <T extends { new (...args: any[]): {} }>(constructor: T) => (
  target: Object,
  key: string,
) => {
  const injections = Reflect.getMetadata('injections', target.constructor) || {};
  injections[key] = { constructor };
  Reflect.defineMetadata('injections', injections, target.constructor);
};
