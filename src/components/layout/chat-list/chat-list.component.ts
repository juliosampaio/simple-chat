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

  appendChat(chat?: ChatPreviewComponent): ChatPreviewComponent{
    return this.
      shadowRoot.
      querySelector('ul')
      .appendChild(document
          .createElement('li')
          .appendChild(chat || new ChatPreviewComponent())
      )
  }

  clearChatList() {
    this.shadowRoot.querySelector('ul').innerHTML = '';
  }

  renderChatList() {
    const list = this.shadowRoot.querySelector('ul')
    this.clearChatList()
    this.chatList.forEach(chat => list.appendChild(document.createElement('li').appendChild(chat)));
  }

  getTemplate(): string {
    return ChatListComponentTemplate;
  }
}
