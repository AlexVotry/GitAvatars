import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { AvatarService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public filters = ['User', 'Topic', 'Language'];
  public filter;
  public queryString;
  public users;

  constructor(private _http: ApiService, private _broadcaster: AvatarService) { }

  pickFilter(filter) {
    this.filter = filter;
  }

  getAvatars() {
    this._http.getAvatars()
    .subscribe(avatars => {
      this.users = avatars[0];
      this._broadcaster.updateAvatar(this.users);
    });
  }

  getQuery() {
    this._http.searchAvatars(this.queryString, this.filter)
    .subscribe(avatars => {
      console.log('app.avatars: ', avatars[0]);
      this._broadcaster.updateAvatar(avatars[0]);
    });
  }
}
