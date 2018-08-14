import { Observable, from, Subject } from 'rxjs';
import { IChatService } from './base.service';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';
import { getRandomCharacter } from '../helpers/rick-and-morty';

declare const ScaleDrone: any;

interface IMember {
  id: string;
  clientData: IUser;
}

export class ScaledroneChatService implements IChatService {
  static server: any;
  static globalRoom: any;
  globalRoomName: string = 'observable-rick-and-morty';
  activeChats: IChat[] = [];
  user: IUser;

  connect(): Observable<boolean> {
    const CHANNEL_ID = 'se3ooZm2WPC4Fc24';
    const connection = new Subject<boolean>();
    this.user = this.getUser();
    ScaledroneChatService.server = new ScaleDrone(CHANNEL_ID, {
      data: this.user,
    });

    ScaledroneChatService.server.on('open', (error: any) => {
      if (error) {
        connection.next(false);
      }
      ScaledroneChatService.globalRoom = ScaledroneChatService.server.subscribe(
        this.globalRoomName,
      );
      ScaledroneChatService.globalRoom.on('open', (error: any) => {
        if (error) {
          connection.next(false);
        }
        connection.next(true);
      });

      ScaledroneChatService.globalRoom.on('members', (members: IMember[]) => {
        console.log('users connected:');
        members.forEach(member => {
          if (member.id !== ScaledroneChatService.server.clientId) {
            console.log(`- ${member.clientData.name}`);
            this.activeChats.push({
              id: member.id,
              avatar: member.clientData.avatar,
              title: member.clientData.name,
            });
          }
        });
      });
    });

    return from(connection);
  }

  getActiveChats(): Observable<IChat[]> {
    const chatsSubject = new Subject<IChat[]>();

    ScaledroneChatService.globalRoom.on('member_join', (member: IMember) => {
      console.log(`${member.clientData.name} is connecting`);
      const chat: IChat = {
        id: member.id,
        title: member.clientData.name,
        avatar: member.clientData.avatar,
      };
      this.activeChats.push(chat);
      chatsSubject.next(this.activeChats);
    });

    ScaledroneChatService.globalRoom.on('member_leave', ({ id, clientData }: IMember) => {
      console.log(`${clientData.name} is leaving`);
      const index = this.activeChats.findIndex(member => member.id === id);
      const l = this.activeChats.splice(index, 1);
      console.log(`${JSON.stringify(l)} is leaving`);
      chatsSubject.next(this.activeChats);
    });

    ScaledroneChatService.globalRoom.on('data', (text: string, member: any) => {
      console.log(text, member);
    });

    return from(chatsSubject);
  }

  getUser(): IUser {
    if (this.user) {
      console.log('has user', this.user);
      return this.user;
    }
    const char = getRandomCharacter();
    const user = {
      avatar: char.avatar,
      name: char.name,
    };
    console.log('has no user', user);
    return user;
  }
}
