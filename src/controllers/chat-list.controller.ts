import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/chat-list/chat-list.component';
import { MemoryChatService } from '../services/memory-chat.service';
import { IChatService } from '../services/base.service';
import { Bind } from '../decorators/bind.decorator';
import { Inject } from '../decorators/inject.decorator';
import { ScaledroneChatService } from '../services/scaledrone-chat.service';

@Inject
export class ChatListController extends AbstractController<ChatListComponent> {
  @Bind(ScaledroneChatService)
  service: IChatService;

  init(): void {
    this.view.addEventListener(ChatListComponent.EVENTS.CHAT_ACTIVE, (a: CustomEvent) => {});
    this.service.getActiveChats().subscribe(chats => {
      this.view.clearChatList();
      chats.forEach(chat => {
        const preview = this.view.appendChat();
        preview.id = chat.id;
        preview.title = chat.title;
        preview.avatarUrl = chat.avatar;
        preview.preview = (chat.lastMessage && chat.lastMessage.body) || '';
      });
    });
  }
}
