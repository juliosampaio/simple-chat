import { Observable, from, Subject } from 'rxjs'

import { IChatService } from './base.service';
import { IChat } from '../models/IChat';
import { IMessage } from '../models/IMessage';
import { IUser } from '../models/IUser';

export class MemoryChatService implements IChatService {
  getActiveChats(): Observable<IChat[]> {

    const ricky:IUser ={
      name: 'Ricky',
      avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    }

    const message:IMessage = {
      id: '1',
      body: 'Hey',
      isRead: false,
      sentAt: new Date(),
      chat: { id: '1' },
      sender: ricky
    }

    const chat:IChat = {
      id: '1',
      avatar: message.sender.avatar,
      title: message.sender.name,
      lastMessage: message
    }

    const chats = new Subject<IChat[]>()

    setInterval(() => chats.next([chat]), 5000)

    return from(chats)
  }
}
