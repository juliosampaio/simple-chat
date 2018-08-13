import { AbstractComponent } from '../base/abstract.component';
import ChatComponentTemplate from './chat.template.html';
import { Updates } from '../../decorators/updates.decorator';
import { AvatarComponent } from '../avatar/avatar.component';
import { MessageComponent } from '../message/message.component';

const EVENTS = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  CHAT_CHANGED: 'CHAT_CHANGED',
};

export class ChatComponent extends AbstractComponent {
  static EVENTS = EVENTS;

  set avatar(avatar: string) {
    this.setAttribute('avatar', avatar);
  }

  get avatar(): string {
    return this.getAttribute('avatar');
  }

  set id(id: string) {
    this.setAttribute('id', id);
    this.dispatchEvent(
      new CustomEvent(EVENTS.CHAT_CHANGED, {
        detail: id,
      }),
    );
  }

  get id(): string {
    return this.getAttribute('id');
  }

  set title(title: string) {
    this.setAttribute('title', title);
  }

  get title(): string {
    return this.getAttribute('title');
  }

  static get observedAttributes() {
    return ['avatar', 'title'];
  }

  addTextAreaEvents() {
    const textarea = this.shadowRoot.querySelector('.textarea');
    const placeholder = this.shadowRoot.querySelector('.placeholder');
    textarea.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        const messageBody = textarea.innerHTML;
        const msgComponent = this.appendMessage(messageBody, 'sent');
        this.dispatchNewMessage(messageBody, msgComponent);
        textarea.innerHTML = '';
      }
      if (textarea.innerHTML.length > 0) {
        placeholder.classList.add('hidden');
      } else {
        placeholder.classList.remove('hidden');
      }
    });
  }

  appendMessage(text: string, type: 'received' | 'sent', time: string = ''): MessageComponent {
    const list = this.shadowRoot.querySelector('.body article');
    const message = list
      .appendChild(document.createElement('section'))
      .appendChild(new MessageComponent());
    const now = new Date();
    message.text = text;
    message.type = type;
    message.time = time || `${now.getHours()}:${now.getMinutes()}`;
    message.scrollIntoView();
    return message;
  }

  clear() {
    this.title = '';
    this.avatar = '';
    this.shadowRoot.querySelector('article').innerHTML = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addTextAreaEvents();
  }

  dispatchNewMessage(message: string, element: MessageComponent) {
    this.dispatchEvent(new CustomEvent(EVENTS.NEW_MESSAGE, { detail: { message, element } }));
  }

  getTemplate() {
    return ChatComponentTemplate;
  }

  @Updates('title')
  updateTitle(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const title = shadowRoot.querySelector('.header h1');
    title.innerHTML = newValue;
  }

  @Updates('avatar')
  updateAvatar(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const avatar: AvatarComponent = shadowRoot.querySelector('app-avatar');
    avatar.imgSrc = newValue;
  }
}
