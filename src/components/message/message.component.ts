import { AbstractComponent } from '../base/abstract.component';
import MessageTemplate from './message.template.html';
import { updates } from '../../decorators/updates';
import 'reflect-metadata';

export class MessageComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['text'];
  }

  get text(): string {
    return this.getAttribute('text');
  }

  set text(text: string) {
    this.setAttribute('text', text);
  }

  getTemplate(): string {
    return MessageTemplate;
  }

  @updates('text')
  updateText(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.body').innerHTML = newValue;
  }
}
