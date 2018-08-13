import { AbstractComponent } from '../base/abstract.component';
import SidebarHeaderComponentTemplate from './sidebar-header.template.html';

export class SidebarHeaderComponent extends AbstractComponent {
  getTemplate(): string {
    return SidebarHeaderComponentTemplate;
  }
}
