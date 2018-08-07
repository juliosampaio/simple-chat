import { Observable } from 'rxjs'
import { IChat } from '../models/IChat';

export interface IChatService {
  getActiveChats(): Observable<IChat[]>;
}
