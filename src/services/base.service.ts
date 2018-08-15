import { Observable } from 'rxjs';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';
import { IMessage } from '../models/IMessage';

export interface IChatService {
  connect(): Observable<boolean>;
  getActiveChats(): Observable<IChat[]>;
  getMessage(chat: IChat): Observable<IMessage>;
  getUser(): IUser;
  sendMessage(message: IMessage): void;
}
