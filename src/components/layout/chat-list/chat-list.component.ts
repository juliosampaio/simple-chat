import { AbstractComponent } from '../../base/abstract.component';
import ChatListComponentTemplate from './chat-list.template.html';
import { updates } from '../../../decorators/updates';
import { ChatPreviewComponent } from '../chat/chat-preview.component';

export class ChatListComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['chats'];
  }

  get chats(): string {
    return this.getAttribute('chats');
  }

  set chats(chats: string) {
    this.setAttribute('chats', chats);
  }

  getTemplate(): string {
    return ChatListComponentTemplate;
  }

  @updates('chats')
  renderChatList(oldValue: Array<ChatPreviewComponent> = [], newValue: Array<ChatPreviewComponent> = [], shadowRoot: ShadowRoot) {
    const list = shadowRoot.querySelector('ul');
    list.innerHTML = '';
    (newValue || []).forEach(chat => list.appendChild(document.createElement('li').appendChild(chat)));
    // for (let i = 0; i < 10; i++) {
    //   const preview = list.appendChild(document.createElement('li')).appendChild(new ChatPreviewComponent());
    //   preview.title = 'Morty';
    //   preview.preview = "Hey Rick, what's up?";
    //   preview.avatarUrl = 'https://rickandmortyapi.com/api/character/avatar/2.jpeg';

    //   const preview2 = list.appendChild(document.createElement('li')).appendChild(new ChatPreviewComponent());
    //   preview2.title = 'Summer';
    //   preview2.preview = 'What you do? You eat our food and make gadgats.boo bye.';
    //   preview2.avatarUrl = 'https://rickandmortyapi.com/api/character/avatar/3.jpeg';
    // }
  }
}
