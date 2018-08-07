import { IMessage } from '../models/IMessage';
import { IChat } from '../models/IChat';

export interface IChatService {
  getActiveChats(): Array<IChat>;
}
