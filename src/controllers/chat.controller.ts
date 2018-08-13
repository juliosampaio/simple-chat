import { AbstractController } from './abstract.controller';
import { IChatService } from '../services/base.service';
import { Bind } from '../decorators/bind.decorator';
import { Inject } from '../decorators/inject.decorator';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';

@Inject
export class ChatController extends AbstractController<ChatComponent> {
  init(): void {
    this.addChatEventListeners();
  }

  addChatEventListeners() {
    this.view.addEventListener(ChatComponent.EVENTS.NEW_MESSAGE, ({ detail }: CustomEvent) => {
      const message: string = detail.message;
      const element: MessageComponent = detail.element;
      this.sendMessage(message, element);
    });
    this.view.addEventListener(ChatComponent.EVENTS.CHAT_CHANGED, ({ detail }: CustomEvent) => {
      console.log(detail);
    });
  }

  sendMessage(message: string, element: MessageComponent) {
    console.log(message, element);
  }
}
