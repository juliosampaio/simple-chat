import { Observable, from, Subject, of } from 'rxjs';
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
  private static globalRoom: any;
  private static user: IUser;
  private static globalRoomName: string = 'observable-rick-and-morty';
  private static activeChats: IChat[] = [];
  private static chatsSubject = new Subject<IChat[]>();
  private static server: any;

  private addServerListeners(room: any) {
    ScaledroneChatService.globalRoom = room;
    this.onMembers(room);
    this.onMemberJoin(room);
    this.onMemberLeave(room);
  }

  connect(): Observable<boolean> {
    const sub = new Subject<boolean>();
    const server = new ScaleDrone('se3ooZm2WPC4Fc24', {
      data: this.getUser(),
    });
    ScaledroneChatService.server = server;
    server.on('open', (error: any) => {
      if (error) {
        sub.next(false);
        return;
      }
      const roomName = ScaledroneChatService.globalRoomName;
      const room = server.subscribe(roomName);
      room.on('open', (error: any) => {
        if (error) {
          sub.next(false);
          return;
        }
        sub.next(true);
      });
      this.addServerListeners(room);
    });
    return sub;
  }

  getActiveChats(): Observable<IChat[]> {
    //TODO: refactor this ugliness
    setTimeout(() => ScaledroneChatService.chatsSubject.next(ScaledroneChatService.activeChats));
    return ScaledroneChatService.chatsSubject;
  }

  getUser(): IUser {
    if (ScaledroneChatService.user) {
      return ScaledroneChatService.user;
    }
    ScaledroneChatService.user = getRandomCharacter();
    return ScaledroneChatService.user;
  }

  onMembers(room: any) {
    room.on('members', (members: IMember[]) => {
      const currentUserID = ScaledroneChatService.server.clientId;
      const activeChats: IChat[] = members
        .filter(member => member.id !== currentUserID)
        .map(({ id, clientData }) => ({
          id,
          title: clientData.name,
          avatar: clientData.avatar,
        }));
      ScaledroneChatService.activeChats = activeChats;
      ScaledroneChatService.chatsSubject.next(activeChats);
    });
  }

  onMemberJoin(room: any) {
    room.on('member_join', ({ id, clientData }: IMember) => {
      const activeChats = ScaledroneChatService.activeChats;
      activeChats.push({
        id,
        title: clientData.name,
        avatar: clientData.avatar,
      });
      ScaledroneChatService.chatsSubject.next(activeChats);
    });
  }

  onMemberLeave(room: any) {
    room.on('member_leave', ({ id }: IMember) => {
      const activeChats = ScaledroneChatService.activeChats;
      const index = activeChats.findIndex(member => member.id === id);
      activeChats.splice(index, 1);
      ScaledroneChatService.chatsSubject.next(activeChats);
    });
  }
}
