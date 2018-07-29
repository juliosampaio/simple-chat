///<reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts"/>"
import { IBaseComponent } from '../components/base/base.component';

export function updates(property: string) {
  return function(target: IBaseComponent, propertyKey: string, descriptor: PropertyDescriptor) {
    const listeners = Reflect.getMetadata('attributeChangeListeners', target) || [];
    listeners.push({ property, callback: descriptor.value });
    Reflect.defineMetadata('attributeChangeListeners', listeners, target);
  };
}
