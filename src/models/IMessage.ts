import { IUser } from './IUser';

export interface IMessage {
  id: string;
  sender: IUser;
  receiver: IUser;
  isSent: boolean;
  isReceived: boolean;
  body: string;
  sendDate: Date;
}
