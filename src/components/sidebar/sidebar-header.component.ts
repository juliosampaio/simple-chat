import { AbstractComponent } from '../base/abstract.component';
import SidebarHeaderComponentTemplate from './sidebar-header.template.html';
import { Updates } from '../../decorators/updates.decorator';
import { AvatarComponent } from '../avatar/avatar.component';

export class SidebarHeaderComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['avatar', 'title'];
  }

  get avatar(): string {
    return this.getAttribute('avatar');
  }

  set avatar(avatar: string) {
    this.setAttribute('avatar', avatar);
  }

  get title(): string {
    return this.getAttribute('title');
  }

  set title(title: string) {
    this.setAttribute('title', title);
  }

  @Updates('avatar')
  updateAvatar(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const avatarComponent: AvatarComponent = shadowRoot.querySelector('app-avatar');
    avatarComponent.imgSrc = newValue;
  }

  @Updates('title')
  updateTitle(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const title = shadowRoot.querySelector('.title');
    title.innerHTML = `${newValue} (you)`;
  }

  getTemplate(): string {
    return SidebarHeaderComponentTemplate;
  }
}
