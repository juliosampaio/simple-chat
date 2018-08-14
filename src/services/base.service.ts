import { Observable } from 'rxjs';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';

export interface IChatService {
  getActiveChats(): Observable<IChat[]>;
  connect(): Observable<boolean>;
  getUser(): IUser;
}
