import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IChat {
  title: string;
  avatar: string;
  members: Array<IUser>;
  messages: Array<IMessage>;
}
