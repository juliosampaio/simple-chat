import 'reflect-metadata';
import { IChat } from '../models/IChat';
import { Bind } from './bind.decorator';
import { MemoryChatService } from '../services/chat.service';

describe('Bind decorator', () => {
  class A {
    @Bind(MemoryChatService)
    memberX: IChat;
    @Bind(MemoryChatService)
    memberY: IChat;
  }

  it('should add metadata to all members decorated with @Bind', () => {
    const metadataKeys = Reflect.getMetadataKeys(A);
    expect(metadataKeys).toContain('injections');

    const injections = Reflect.getMetadata('injections', A);
    const members = Object.keys(injections);
    expect(members).toContain('memberX');
    expect(members).toContain('memberY');
  });

  it("should provide the constructor in the 'constructor' property", () => {
    const injections = Reflect.getMetadata('injections', A);
    const constructor = injections.memberX.constructor;
    expect(new constructor()).toBeInstanceOf(MemoryChatService);
  });
});
