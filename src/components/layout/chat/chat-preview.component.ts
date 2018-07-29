import { AbstractComponent } from '../../base/abstract.component';
import ChatPreviewComponentTemplate from './chat-preview.template.html';
import { updates } from '../../../decorators/updates';

export class ChatPreviewComponent extends AbstractComponent {
  get avatarUrl(): string {
    return this.getAttribute('avatarUrl');
  }

  set avatarUrl(avatarUrl: string) {
    this.setAttribute('avatarUrl', avatarUrl);
  }

  get preview(): string {
    return this.getAttribute('preview');
  }

  set preview(preview: string) {
    this.setAttribute('preview', preview);
  }

  get title(): string {
    return this.getAttribute('title');
  }

  set title(title: string) {
    this.setAttribute('title', title);
  }

  static get observedAttributes() {
    return ['avatarUrl', 'preview', 'title'];
  }

  getTemplate(): string {
    return ChatPreviewComponentTemplate;
  }

  @updates('avatarUrl')
  updateAvatarUrl(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    // shadowRoot.querySelector('.title').innerHTML = newValue;
    console.log('updateAvatarUrl');
  }

  @updates('title')
  updateTitle(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.title').innerHTML = newValue;
  }

  @updates('preview')
  updatePreview(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.preview').innerHTML = newValue;
  }
}
