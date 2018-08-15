import { Observable, from, Subject } from 'rxjs';
import { IChatService } from './base.service';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';
import { IMessage } from '../models/IMessage';

export class LocalStorageChatService implements IChatService {
  getActiveChats(): Observable<IChat[]> {
    return null;
  }
  connect(): Observable<boolean> {
    return null;
  }
  getUser(): IUser {
    return null;
  }
  sendMessage(message: IMessage) {}

  getMessage(chat: IChat): Observable<IMessage> {
    throw new Error('Method not implemented.');
  }
}
