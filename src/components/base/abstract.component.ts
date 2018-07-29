import { IBaseComponent, AttributeChangeListenerCallback, AttributeChangeListener } from './base.component';

export abstract class AbstractComponent extends HTMLElement implements IBaseComponent {
  constructor(shadhowRootInit: ShadowRootInit = { mode: 'open' }) {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = this.getTemplate();
    const shadowRoot = this.attachShadow(shadhowRootInit);
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: string) {
    const callback = this.getAttributeChangeListenerFor(name);
    return callback && callback(oldValue, newValue, this.shadowRoot);
  }

  getAttributeChangeListenerFor(propertyName: string): AttributeChangeListenerCallback {
    const listener = this.getAttributeChangeListeners().filter(item => item.property === propertyName)[0];
    return listener && listener.callback;
  }

  getAttributeChangeListeners(): AttributeChangeListener[] {
    return Reflect.getMetadata('attributeChangeListeners', this);
  }

  abstract getTemplate(): string;
}
