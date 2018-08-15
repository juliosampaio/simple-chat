import { IUser } from './IUser';
import { IChat } from './IChat';

export interface IMessage {
  id?: string;
  sender: IUser;
  body: string;
  isRead?: boolean;
  sentAt: Date;
  chat?: IChat;
}
