import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/layout/chat-list/chat-list.component';
import { MemoryChatService } from '../services/chat.service';
import { IChatService } from '../services/base.service';
import { Inject } from '../decorators/inject.decorator';
import { Controller } from '../decorators/controller.decorator';

@Controller
export class ChatListController extends AbstractController<ChatListComponent> {
  @Inject(MemoryChatService) private service: IChatService;

  init(): void {
    this.view.addEventListener('connected', () => {
      console.log(this.service);
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
