import { AbstractComponent } from '../base/abstract.component';
import ChatComponentTemplate from './chat.template.html';
import { Updates } from '../../decorators/updates.decorator';
import { AvatarComponent } from '../avatar/avatar.component';

export class ChatComponent extends AbstractComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addTextAreaEvents();
  }

  addTextAreaEvents() {
    const textarea = this.shadowRoot.querySelector('.textarea');
    const placeholder = this.shadowRoot.querySelector('.placeholder');
    textarea.addEventListener('keyup', (e: KeyboardEvent) => {
      if (textarea.innerHTML.length > 0) {
        placeholder.classList.add('hidden');
      } else {
        placeholder.classList.remove('hidden');
      }
      if (e.keyCode === 13) {
        textarea.innerHTML = '';
      }
      console.log(e);
    });
  }

  getTemplate() {
    return ChatComponentTemplate;
  }
}
