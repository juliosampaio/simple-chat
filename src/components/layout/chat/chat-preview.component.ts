import { AbstractComponent } from '../../base/abstract.component';
import ChatPreviewComponentTemplate from './chat-preview.template.html';
import { Updates } from '../../../decorators/updates.decorator';
import { AvatarComponent } from '../../avatar/avatar.component';

export class ChatPreviewComponent extends AbstractComponent {
  get avatarUrl(): string {
    return this.getAttribute('avatar-url');
  }

  set avatarUrl(avatarUrl: string) {
    this.setAttribute('avatar-url', avatarUrl);
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
    return ['avatar-url', 'preview', 'title'];
  }

  getTemplate(): string {
    return ChatPreviewComponentTemplate;
  }

  @Updates('avatar-url')
  updateAvatarUrl(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const avatar: AvatarComponent = <AvatarComponent>shadowRoot.querySelector('.avatar').childNodes[1];
    avatar.imgSrc = newValue;
  }

  @Updates('title')
  updateTitle(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.title').innerHTML = newValue;
  }

  @Updates('preview')
  updatePreview(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    shadowRoot.querySelector('.preview').innerHTML = newValue;
  }
}
