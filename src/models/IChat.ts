import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IChat {
  id: string;
  title?: string;
  avatar?: string;
  lastMessage?: IMessage;
}
