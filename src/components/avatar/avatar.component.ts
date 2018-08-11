import { AbstractComponent } from '../base/abstract.component';
import AvatarComponentTemplate from './avatar.template.html';
import { Updates } from '../../decorators/updates.decorator';

export class AvatarComponent extends AbstractComponent {
  static get observedAttributes() {
    return ['img-src', 'alt', 'width', 'height'];
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

  get width(): string {
    return this.getAttribute('width');
  }

  set width(width: string) {
    this.setAttribute('width', width);
  }

  get height(): string {
    return this.getAttribute('height');
  }

  set height(height: string) {
    this.setAttribute('height', height);
  }

  @Updates('img-src')
  updateImageSrc(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const img: HTMLImageElement = shadowRoot.querySelector('img');
    img.src = newValue;
  }

  @Updates('alt')
  updateAlt(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const img: HTMLImageElement = shadowRoot.querySelector('img');
    img.alt = newValue;
  }

  @Updates('width')
  updateWidth(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const wrapper: HTMLElement = shadowRoot.querySelector('.wrapper');
    wrapper.style.width = `${newValue}px`;
    shadowRoot.querySelector('img').width = newValue;
  }

  @Updates('height')
  updateHeight(oldValue: any, newValue: any, shadowRoot: ShadowRoot) {
    const wrapper: HTMLElement = shadowRoot.querySelector('.wrapper');
    wrapper.style.height = `${newValue}px`;
    shadowRoot.querySelector('img').height = newValue;
  }

  getTemplate(): string {
    return AvatarComponentTemplate;
  }
}
