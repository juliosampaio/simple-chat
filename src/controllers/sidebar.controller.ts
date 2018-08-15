import { AbstractController } from './abstract.controller';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { IChatService } from '../services/base.service';
import { Bind } from '../decorators/bind.decorator';
import { ScaledroneChatService } from '../services/scaledrone-chat.service';
import { Inject } from '../decorators/inject.decorator';
import { SidebarHeaderComponent } from '../components/sidebar/sidebar-header.component';

@Inject
export class SidebarController extends AbstractController<SidebarComponent> {
  @Bind(ScaledroneChatService)
  private chatService: IChatService;

  init(): void {
    this.updateHeader();
  }

  updateHeader() {
    console.log('atualizando header');
    const header: SidebarHeaderComponent = this.view.querySelector('app-sidebar-header');
    header.avatar = this.chatService.getUser().avatar;
  }
}
