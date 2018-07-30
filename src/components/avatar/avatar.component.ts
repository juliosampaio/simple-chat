import { AbstractComponent } from '../base/abstract.component';
import AvatarComponentTemplate from './avatar.template.html';
import { updates } from '../../decorators/updates';

export class AvatarComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['img-src', 'alt'];
  }

  get imgSrc(): string {
    return this.getAttribute('img-src');
  }

  set imgSrc(imgSrc: string) {
    this.setAttribute('img-src', imgSrc);
  }

  get alt(): string {
    return this.getAttribute('alt');
  }

  set alt(alt: string) {
    this.setAttribute('alt', alt);
  }

  @updates('img-src')
  updateImageSrc(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const img: HTMLImageElement = shadowRoot.querySelector('img');
    img.src = newValue;
  }

  @updates('alt')
  updateAlt(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const img: HTMLImageElement = shadowRoot.querySelector('img');
    img.alt = newValue;
  }

  getTemplate(): string {
    return AvatarComponentTemplate;
  }
}