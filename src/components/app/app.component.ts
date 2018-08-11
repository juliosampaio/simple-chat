import { AbstractComponent } from '../base/abstract.component';
import AppTemplate from './app.template.html';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatListController } from '../../controllers/chat-list.controller';

export class AppComponent extends AbstractComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.bindControllers();
  }

  bindControllers() {
    const chatList: ChatListComponent = this.shadowRoot.querySelector('app-chat-list');
    new ChatListController(chatList);
  }

  getTemplate(): string {
    return AppTemplate;
  }
}
