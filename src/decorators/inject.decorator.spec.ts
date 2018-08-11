import 'reflect-metadata';
import { Inject } from './inject.decorator';
import { IChat } from '../models/IChat';
import { MemoryChatService, LocalStorageChatService } from '../services/chat.service';
import { Bind } from './bind.decorator';
import { IChatService } from '../services/base.service';

describe('Inject decorator', () => {
  @Inject
  class SimpleClass {
    @Bind(MemoryChatService)
    memberX: IChat;
    @Bind(LocalStorageChatService)
    memberY: IChat;
  }
  it('should keep instance with the same Type despite its constructor was overridden by @Inject', () => {
    const instance = new SimpleClass();
    expect(instance).toBeInstanceOf(SimpleClass);
  });
  it('should inject instances according members @Bind decoration', () => {
    const instance = new SimpleClass();
    expect(instance).toBeInstanceOf(SimpleClass);
    expect(instance.memberX).toBeInstanceOf(MemoryChatService);
    expect(instance.memberY).toBeInstanceOf(LocalStorageChatService);
  });
});
