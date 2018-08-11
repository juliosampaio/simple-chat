/**
 * Injects all registered injections (through @Bind decorator) into the constructor instance by overriding
 * the original constructor
 * @param constructor The decorated class constructor
 * @see Bind
 */
export const Inject = <T extends { new (...args: any[]): {} }>(constructor: T) => {
  const injections = Reflect.getMetadata('injections', constructor);
  const instances = Object.keys(injections).map(key => new injections[key].constructor());
  const originalConstructor = constructor;

  const modifyConstructor = (constructor: T, args: any) => {
    const modifiedConstructor: any = function() {
      return new constructor(...args);
    };
    modifiedConstructor.prototype = constructor.prototype;
    const tempInstance = new modifiedConstructor();
    Object.keys(injections).forEach(property => {
      tempInstance[property] = new injections[property].constructor();
    });
    return tempInstance;
  };

  const ModifiedConstructor: any = function(...args: any[]) {
    const argsWithInjections = args.concat(instances);
    return modifyConstructor(originalConstructor, argsWithInjections);
  };

  // copy prototype so intanceof operator still works
  ModifiedConstructor.prototype = originalConstructor.prototype;

  return ModifiedConstructor;
};
