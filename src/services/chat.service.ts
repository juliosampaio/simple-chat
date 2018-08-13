import { Observable, from, Subject } from 'rxjs';

import { IChatService } from './base.service';
import { IChat } from '../models/IChat';
import { IMessage } from '../models/IMessage';
import { IUser } from '../models/IUser';

export class MemoryChatService implements IChatService {
  getActiveChats(): Observable<IChat[]> {
    const ricky: IUser = {
      name: 'Rick',
      avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };

    const morty: IUser = {
      name: 'Morty',
      avatar: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    };

    const message: IMessage = {
      id: '1',
      body: 'Hey 😅',
      isRead: false,
      sentAt: new Date(),
      chat: { id: '1' },
      sender: ricky,
    };

    const message2: IMessage = {
      id: '2',
      body: 'Sup dude?',
      isRead: false,
      sentAt: new Date(),
      chat: { id: '2' },
      sender: morty,
    };

    const chat: IChat = {
      id: '1',
      avatar: message.sender.avatar,
      title: message.sender.name,
      lastMessage: message,
    };

    const chat2: IChat = {
      id: '2',
      avatar: message2.sender.avatar,
      title: message2.sender.name,
      lastMessage: message2,
    };

    const chats = new Subject<IChat[]>();

    setTimeout(() => chats.next([chat, chat2]), 1000);

    return from(chats);
  }
}

export class LocalStorageChatService implements IChatService {
  getActiveChats(): Observable<IChat[]> {
    return null;
  }
}
