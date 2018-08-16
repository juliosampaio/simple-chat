import { IBaseComponent } from '../components/base/base.component';
/**
 * Method decorator
 * Adds a attributeChangeListeners property into the target metadata
 * This property contains listeners that can be used when a component's attribute changes
 * its consumed by the AbstractComponent class to dispatch them when the attributeChangedCallback event happens
 * @param property the name of the property
 */
export function Updates(property: string) {
  return function(target: IBaseComponent, propertyKey: string, descriptor: PropertyDescriptor) {
    const listeners = Reflect.getMetadata('attributeChangeListeners', target) || [];
    listeners.push({ property, callback: descriptor.value });
    Reflect.defineMetadata('attributeChangeListeners', listeners, target);
  };
}
