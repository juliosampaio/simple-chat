import { AbstractComponent } from '../base/abstract.component';
import ChatComponentTemplate from './chat.template.html';
import { Updates } from '../../decorators/updates.decorator';
import { AvatarComponent } from '../avatar/avatar.component';

export class ChatComponent extends AbstractComponent {
  getTemplate() {
    return ChatComponentTemplate;
  }
}
