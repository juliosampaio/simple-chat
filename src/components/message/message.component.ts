import { AbstractComponent } from '../base/abstract.component';
import MessageTemplate from './message.template.html';
import { Updates } from '../../decorators/updates.decorator';
import 'reflect-metadata';

export class MessageComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['sender', 'text', 'time', 'type'];
  }

  get sender(): string {
    return this.getAttribute('sender');
  }

  set sender(sender: string) {
    this.setAttribute('sender', sender);
  }

  get text(): string {
    return this.getAttribute('text');
  }

  set text(text: string) {
    this.setAttribute('text', text);
  }

  get time(): string {
    return this.getAttribute('time');
  }

  set time(time: string) {
    this.setAttribute('time', time);
  }

  get type(): string {
    return this.getAttribute('type');
  }

  set type(type: string) {
    this.setAttribute('type', type);
  }

  getTemplate(): string {
    return MessageTemplate;
  }

  @Updates('text')
  updateText(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.body .text').innerHTML = newValue;
  }

  @Updates('time')
  updateTime(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.time').innerHTML = newValue;
  }

  @Updates('sender')
  updateSender(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.body .sender').innerHTML = newValue;
  }
}
