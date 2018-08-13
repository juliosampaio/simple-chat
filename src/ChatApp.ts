import { IBaseComponent } from './components/base/base.component';
import { MessageComponent } from './components/message/message.component';
import { AppComponent } from './components/app/app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatPreviewComponent } from './components/chat-preview/chat-preview.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListController } from './controllers/chat-list.controller';
import { ChatController } from './controllers/chat.controller';

interface ICustomComponent {
  component: new () => IBaseComponent;
  tag: string;
}

export class ChatApp {
  private customComponents: Array<ICustomComponent> = [
    { component: MessageComponent, tag: 'message' },
    { component: AppComponent, tag: 'layout' },
    { component: SidebarComponent, tag: 'sidebar' },
    { component: ChatComponent, tag: 'chat' },
    { component: ChatListComponent, tag: 'chat-list' },
    { component: ChatPreviewComponent, tag: 'chat-preview' },
    { component: AvatarComponent, tag: 'avatar' },
  ];

  constructor(private namespace: string) {}

  addEvents() {}

  bindControllers() {
    const appLayout: AppComponent = document.querySelector('app-layout');
    new ChatListController(appLayout.chatList).init();
    new ChatController(appLayout.chat).init();
  }

  defineComponents() {
    this.customComponents.map(({ component, tag }) => {
      if (!window.customElements.get(tag)) {
        window.customElements.define(`${this.namespace}-${tag}`, component);
      }
    });
  }

  init() {
    this.defineComponents();
    this.bindControllers();
    this.addEvents();
  }
}
