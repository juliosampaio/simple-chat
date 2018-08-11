import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/chat-list/chat-list.component';
import { MemoryChatService } from '../services/chat.service';
import { IChatService } from '../services/base.service';
import { Bind } from '../decorators/bind.decorator';
import { Inject } from '../decorators/inject.decorator';

@Inject
export class ChatListController extends AbstractController<ChatListComponent> {
  @Bind(MemoryChatService)
  service: IChatService;

  init(): void {
    this.view.addEventListener(ChatListComponent.EVENTS.CHAT_ACTIVE, (a: CustomEvent) => {});
    this.view.addEventListener('connected', () => {
      this.service.getActiveChats().subscribe(chats => {
        chats.forEach(chat => {
          const preview = this.view.appendChat();
          preview.title = chat.title;
          preview.avatarUrl = chat.avatar;
          preview.preview = chat.lastMessage.body;
        });
      });
    });
  }
}
