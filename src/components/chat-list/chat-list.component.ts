import { AbstractComponent } from '../base/abstract.component';
import ChatListComponentTemplate from './chat-list.template.html';
import { ChatPreviewComponent } from '../chat/chat-preview.component';

const EVENTS = {
  CHAT_ACTIVE: 'CHAT_ACTIVE',
};

export class ChatListComponent extends AbstractComponent {
  static EVENTS = EVENTS;
  private chatList: Array<ChatPreviewComponent> = [];
  private activeChat: ChatPreviewComponent;

  static get observedAttributes() {
    return ['chats'];
  }

  get messages(): Array<ChatPreviewComponent> {
    return this.chatList;
  }

  set messages(chatLis: Array<ChatPreviewComponent>) {
    this.chatList = chatLis;
    this.renderChatList();
  }

  appendChat(chat?: ChatPreviewComponent): ChatPreviewComponent {
    const child = this.shadowRoot
      .querySelector('ul')
      .appendChild(document.createElement('li').appendChild(chat || new ChatPreviewComponent()));

    child.addEventListener('click', this.addSelectChatEvent(child));

    return child;
  }

  clearChatList() {
    this.shadowRoot.querySelector('ul').innerHTML = '';
  }

  renderChatList() {
    const list = this.shadowRoot.querySelector('ul');
    this.clearChatList();
    this.chatList.forEach(chat => list.appendChild(document.createElement('li').appendChild(chat)));
  }

  addSelectChatEvent(chat: ChatPreviewComponent) {
    return () => {
      this.shadowRoot
        .querySelectorAll('ul app-chat-preview')
        .forEach((c: ChatPreviewComponent) => (c.active = false));
      chat.active = true;
      this.activeChat = chat;
      this.dispatchEvent(
        new CustomEvent(EVENTS.CHAT_ACTIVE, {
          detail: chat,
        }),
      );
    };
  }

  getTemplate(): string {
    return ChatListComponentTemplate;
  }
}
