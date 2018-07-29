import { AbstractComponent } from '../../base/abstract.component';
import SidebarComponentTemplate from './sidebar.template.html';

export class SidebarComponent extends AbstractComponent {
  getTemplate(): string {
    return SidebarComponentTemplate;
  }
}
