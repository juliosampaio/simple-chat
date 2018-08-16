import { Observable, from, Subject } from 'rxjs';
import { IChatService } from './base.service';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';
import { IMessage } from '../models/IMessage';

export class LocalStorageChatService implements IChatService {
  getActiveChats(): Observable<IChat[]> {
    throw new Error('Method not implemented.');
  }
  connect(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getUser(): IUser {
    throw new Error('Method not implemented.');
  }
  sendMessage(message: IMessage) {
    throw new Error('Method not implemented.');
  }

  getMessage(chat: IChat): Observable<IMessage> {
    throw new Error('Method not implemented.');
  }
}
