import { AbstractComponent } from '../base/abstract.component';
import LayoutTemplate from './layout.template.html';

export class LayoutComponent extends AbstractComponent {
  getTemplate(): string {
    return LayoutTemplate;
  }
}
