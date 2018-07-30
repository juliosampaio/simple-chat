import { IBaseComponent } from './components/base/base.component';
import { MessageComponent } from './components/message/message.component';
import { AbstractComponent } from './components/base/abstract.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ChatListComponent } from './components/layout/chat-list/chat-list.component';
import { ChatPreviewComponent } from './components/layout/chat/chat-preview.component';
import { AvatarComponent } from './components/avatar/avatar.component';

interface ICustomComponent {
  component: new () => IBaseComponent;
  tag: string;
}

export class App {
  private customComponents: Array<ICustomComponent> = [
    { component: MessageComponent, tag: 'message' },
    { component: LayoutComponent, tag: 'layout' },
    { component: SidebarComponent, tag: 'sidebar' },
    { component: ChatListComponent, tag: 'chat-list' },
    { component: ChatPreviewComponent, tag: 'chat-preview' },
    { component: AvatarComponent, tag: 'avatar' },
  ];

  constructor(private namespace: string) {}

  defineComponents() {
    this.customComponents.map(({ component, tag }) => {
      if (!window.customElements.get(tag)) {
        window.customElements.define(`${this.namespace}-${tag}`, component);
      }
    });
  }
}
