import { IBaseComponent } from './components/base/base.component';
import { MessageComponent } from './components/message/message.component';
import { AbstractComponent } from './components/base/abstract.component';

interface ICustomComponent {
  component: new () => IBaseComponent;
  tag: string;
}

export class App<T extends AbstractComponent> {
  private customComponents: Array<ICustomComponent> = [{ component: MessageComponent, tag: 'message' }];

  constructor(private namespace: string) {}

  defineComponents() {
    this.customComponents.map(({ component, tag }) => {
      if (!window.customElements.get(tag)) {
        window.customElements.define(`${this.namespace}-${tag}`, component);
      }
    });
  }
}
