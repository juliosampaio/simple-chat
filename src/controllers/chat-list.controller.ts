import { AbstractController } from './abstract.controller';
import { ChatListComponent } from '../components/layout/chat-list/chat-list.component';
import { ChatPreviewComponent } from '../components/layout/chat/chat-preview.component';

export class ChatListController extends AbstractController<ChatListComponent> {
  init(): void {
    this.view.addEventListener('connected', () => {
      const chat = new ChatPreviewComponent();
      const panel = this.view;
      panel.messages = [chat];
      chat.title = 'Julio Sampaio';
      chat.avatarUrl = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
      chat.preview = 'Hey...';
    });
  }
}
