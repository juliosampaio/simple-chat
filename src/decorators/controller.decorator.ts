export const Controller = <T extends { new (...args: any[]): {} }>(constructor: T) => {
  const injections = Reflect.getMetadata('injections', constructor);

  const instances = Object.keys(injections).map(key => new injections[key].constructor());

  // save a reference to the original constructor
  var original = constructor;

  // a utility function to generate instances of a class
  function construct(constructor: T, args: any) {
    var c: any = function() {
      return new constructor(...args);
      // return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    const i = new c();
    Object.keys(injections).forEach(key => {
      i[key] = new injections[key].constructor();
    });
    return i;
  }

  // the new constructor behaviour
  var f: any = function(...args: any[]) {
    const argsWithInjections = args.concat(instances);
    return construct(original, argsWithInjections);
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;

  // return class extends constructor {};
};
