import { IChatService } from './base.service';
import { IChat } from '../models/IChat';

export class MemoryChatService implements IChatService {
  getActiveChats(): Array<IChat> {
    return [
      {
        avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        title: 'Ricky',
        messages: [],
        members: [{ avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', name: 'Ricky' }],
      },
    ];
  }
}
