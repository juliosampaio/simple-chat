import { IBaseComponent } from './base.component';

export abstract class AbstractComponent extends HTMLElement implements IBaseComponent {
  constructor(shadhowRootInit: ShadowRootInit = { mode: 'open' }) {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = this.getTemplate();
    const shadowRoot = this.attachShadow(shadhowRootInit);
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
  abstract getTemplate(): string;
}
