import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AvatarService } from '../service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css']
})
export class AvatarsComponent implements OnInit {

  constructor(private _http: ApiService, private _broadcaster: AvatarService) { }

  public subscription: Subscription;
  public users;
  public showFollowers = false;
  public followers;
  public member;
  public showDetails;
  public details;
  public tIndex = -1;

  ngOnInit() {
    this.getAvatars();
    this.subscription = this._broadcaster.avatar$
    .subscribe(newAvatars => {
      this.users = newAvatars;
    });
  }

  getAvatars() {
    this._http.getAvatars()
    .subscribe(avatars => {
      this.users = avatars;
      this._broadcaster.updateAvatar(this.users);
    });
  }

  getDetails(user) {
    this._http.getDetails(user)
    .subscribe(details => {
      this.details = details;
    });
    this.showDetails = true;
  }

  checkFollowers(user) {
    if (user.followers) {
      this._http.getfollowers(user.login)
      .subscribe(followers => {
        this.followers = followers[0];
        this.member = followers[1];
      });
      this.showFollowers = true;
    }
  }

  closeModal() {
    this.showFollowers = false;
    this.showDetails = false;
  }

  nextPage() {
    let lastAvatar = this.users[99].id;
    this._http.getNextAvatars(lastAvatar)
    .subscribe(avatars => {
      this.users = avatars;
      this._broadcaster.updateAvatar(this.users);
    });
    this.tIndex++;
  }

  previousPage() {
    this._http.getPrevAvatars()
    .subscribe(avatars => {
      this.users = avatars;
      this._broadcaster.updateAvatar(this.users);
    });
    this.tIndex--;
  }

}
