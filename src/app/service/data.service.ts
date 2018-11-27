import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject, Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable()
export class AvatarService {

  private avatar: [{}];
  private avatarSubject = new BehaviorSubject([{}]);
  public avatar$  = this.avatarSubject.asObservable();

  updateAvatar(avatar: {}) {
    console.log('broadcast: ', avatar);
    this.avatar = _.cloneDeep(avatar);
    this.avatarSubject.next(_.cloneDeep(this.avatar));
  }

}
