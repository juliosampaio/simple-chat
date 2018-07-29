export type AttributeChangeListenerCallback = (oldValue: any, newValue: any, shadowRoot: ShadowRoot) => void;

export interface AttributeChangeListener {
  property: string;
  callback: AttributeChangeListenerCallback;
}

export interface IBaseComponent {
  getAttributeChangeListeners(): Array<AttributeChangeListener>;
  getAttributeChangeListenerFor(propertyName: string): AttributeChangeListenerCallback;
  getTemplate(): string;
}
