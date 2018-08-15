import { AbstractController } from './abstract.controller';
import { IChatService } from '../services/base.service';
import { Bind } from '../decorators/bind.decorator';
import { Inject } from '../decorators/inject.decorator';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { ScaledroneChatService } from '../services/scaledrone-chat.service';
import { IMessage } from '../models/IMessage';

@Inject
export class ChatController extends AbstractController<ChatComponent> {
  @Bind(ScaledroneChatService)
  private chatService: IChatService;
  private chatID: string;

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
      this.chatID = detail;
    });
    this.chatService
      .getMessage({ id: this.chatID })
      .subscribe(message => this.onMessageReceived(message));
  }

  onMessageReceived(message: IMessage) {
    if (message.sender.id === this.chatService.getUser().id) {
      return;
    }
    this.view.appendMessage(message.body, 'received', message.sender.name);
  }

  sendMessage(message: string, element: MessageComponent) {
    this.chatService.sendMessage({
      sentAt: new Date(),
      sender: this.chatService.getUser(),
      body: message,
    });
  }
}
