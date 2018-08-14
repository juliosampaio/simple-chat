import { AbstractComponent } from '../base/abstract.component';
import SidebarHeaderComponentTemplate from './sidebar-header.template.html';
import { Updates } from '../../decorators/updates.decorator';
import { AvatarComponent } from '../avatar/avatar.component';

export class SidebarHeaderComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['avatar'];
  }

  get avatar(): string {
    return this.getAttribute('avatar');
  }

  set avatar(avatar: string) {
    this.setAttribute('avatar', avatar);
  }

  @Updates('avatar')
  updateAvatar(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const avatarComponent: AvatarComponent = shadowRoot.querySelector('app-avatar');
    avatarComponent.imgSrc = newValue;
  }

  getTemplate(): string {
    return SidebarHeaderComponentTemplate;
  }
}
