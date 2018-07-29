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
  renderMessagesList(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const list = shadowRoot.querySelector('ul');
    list.innerHTML = '';
    const ul = document.createElement('li');
    const preview = new ChatPreviewComponent();
    preview.title = 'Morty';
    preview.preview = "Hey Rick, what's up?";
    preview.avatarUrl = 'https://rickandmortyapi.com/api/character/avatar/2.jpeg';
    ul.appendChild(preview);
    list.appendChild(ul);
  }
}
