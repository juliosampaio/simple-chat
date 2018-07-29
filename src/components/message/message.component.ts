import { AbstractComponent } from '../base/abstract.component';
import MessageTemplate from './message.template.html';

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
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.shadowRoot.querySelector('p').innerHTML = newValue;
  }
}
