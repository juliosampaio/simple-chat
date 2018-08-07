import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/layout/chat-list/chat-list.component';
import { ChatPreviewComponent } from '../components/layout/chat/chat-preview.component';
import { MemoryChatService } from '../services/chat.service';

export class ChatListController extends AbstractController<ChatListComponent> {
  init(): void {
    this.view.addEventListener('connected', () => {
      new MemoryChatService()
        .getActiveChats()
        .subscribe((chats) => {
          chats.forEach(chat => {
            const preview = this.view.appendChat()
            preview.title = chat.title;
            preview.avatarUrl = chat.avatar;
            preview.preview = chat.lastMessage.body
          })
        })

    });
  }
}
