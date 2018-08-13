import { IBaseController } from './base.controller';
import { IBaseComponent } from '../components/base/base.component';

export abstract class AbstractController<T extends IBaseComponent> implements IBaseController {
  public view: T;
  constructor(view: T) {
    this.view = view;
  }
  abstract init(): void;
}
