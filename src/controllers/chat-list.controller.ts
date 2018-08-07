import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/layout/chat-list/chat-list.component';
import { ChatPreviewComponent } from '../components/layout/chat/chat-preview.component';
import { MemoryChatService } from '../services/chat.service';

export class ChatListController extends AbstractController<ChatListComponent> {
  init(): void {
    this.view.addEventListener('connected', () => {
      const fragment = document.createDocumentFragment();
      const chats = new MemoryChatService().getActiveChats().map(chat => {
        const preview = new ChatPreviewComponent();
        fragment.appendChild(preview);
        preview.title = chat.title;
        preview.avatarUrl = chat.avatar;
        // preview.preview = chat.messages[0].body;
        return preview;
      });
      const panel = this.view;
      panel.messages = <any>fragment.childNodes;
    });
  }
}
