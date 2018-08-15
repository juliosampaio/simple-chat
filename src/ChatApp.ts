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
import { SidebarHeaderComponent } from './components/sidebar/sidebar-header.component';
import { ScaledroneChatService } from './services/scaledrone-chat.service';
import { SidebarController } from './controllers/sidebar.controller';
import { IChatService } from './services/base.service';
import { Bind } from './decorators/bind.decorator';
import { Inject } from './decorators/inject.decorator';
import { reject } from '../node_modules/@types/bluebird';

interface ICustomComponent {
  component: new () => IBaseComponent;
  tag: string;
}

@Inject
export class ChatApp {
  private customComponents: Array<ICustomComponent> = [
    { component: MessageComponent, tag: 'message' },
    { component: AppComponent, tag: 'layout' },
    { component: SidebarComponent, tag: 'sidebar' },
    { component: ChatComponent, tag: 'chat' },
    { component: ChatListComponent, tag: 'chat-list' },
    { component: ChatPreviewComponent, tag: 'chat-preview' },
    { component: AvatarComponent, tag: 'avatar' },
    { component: SidebarHeaderComponent, tag: 'sidebar-header' },
  ];

  @Bind(ScaledroneChatService)
  private chatService: IChatService;

  constructor(private namespace: string) {}

  bindControllers() {
    const appLayout: AppComponent = document.querySelector('app-layout');
    new SidebarController(appLayout.sidebar).init();
    new ChatListController(appLayout.chatList).init();
    new ChatController(appLayout.chat).init();
  }

  connectServer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.chatService.connect().subscribe(isConnected => {
        if (isConnected) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  defineComponents() {
    this.customComponents.map(({ component, tag }) => {
      if (!window.customElements.get(tag)) {
        window.customElements.define(`${this.namespace}-${tag}`, component);
      }
    });
  }

  init() {
    this.connectServer()
      .then(() => {
        this.defineComponents();
        this.bindControllers();
        this.hideSpinner();
      })
      .catch(console.log);
  }

  hideSpinner() {
    document.getElementById('main-loader').style.display = 'none';
  }
}
