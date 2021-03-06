import { AbstractComponent } from '../base/abstract.component';
import AppTemplate from './app.template.html';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatComponent } from '../chat/chat.component';
import { ChatPreviewComponent } from '../chat-preview/chat-preview.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

export class AppComponent extends AbstractComponent {
  chatList: ChatListComponent;
  chat: ChatComponent;
  sidebar: SidebarComponent;

  constructor() {
    super();
  }

  bindEventListeners() {
    this.chatList.addEventListener(
      ChatListComponent.EVENTS.CHAT_ACTIVE,
      ({ detail }: CustomEvent) => {
        const chatPreview: ChatPreviewComponent = detail;
        this.chat.avatar = chatPreview.avatarUrl;
        this.chat.id = chatPreview.id;
        this.chat.title = chatPreview.title;
      },
    );
  }

  bindComponents() {
    this.chatList = this.shadowRoot.querySelector('app-chat-list');
    this.chat = this.shadowRoot.querySelector('app-chat');
    this.sidebar = this.shadowRoot.querySelector('app-sidebar');
  }

  connectedCallback() {
    super.connectedCallback();
    this.bindComponents();
    this.bindEventListeners();
  }

  getTemplate(): string {
    return AppTemplate;
  }
}
