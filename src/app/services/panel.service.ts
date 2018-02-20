import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PanelService {

  constructor() { }

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  // Service message
  emitChange(myMessage: any) {
    this.emitChangeSource.next(myMessage);
  }

}
