import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css']
})
export class AvatarsComponent implements OnInit {

  constructor(private _http: ApiService) { }
  public subscription: Subscription;
  public users;
  public showFollowers = false;
  public followers;
  public member;
  public showDetails;
  public details;

  ngOnInit() {
    this.getAvatars();
  }

  getAvatars() {
    this._http.getAvatars()
    .subscribe(avatars => {
      this.users = avatars[0];
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
        this.member = followers[2];
      });
      this.showFollowers = true;
    }
  }

  closeModal() {
    this.showFollowers = false;
    this.showDetails = false;
  }
}
