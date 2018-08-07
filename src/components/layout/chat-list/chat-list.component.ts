import { AbstractComponent } from '../../base/abstract.component';
import ChatListComponentTemplate from './chat-list.template.html';
import { ChatPreviewComponent } from '../chat/chat-preview.component';

export class ChatListComponent extends AbstractComponent {
  private chatList: Array<ChatPreviewComponent> = [];

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

  renderChatList() {
    const list = this.shadowRoot.querySelector('ul');
    list.innerHTML = '';
    this.chatList.forEach(chat => list.appendChild(document.createElement('li').appendChild(chat)));
  }

  getTemplate(): string {
    return ChatListComponentTemplate;
  }
}
