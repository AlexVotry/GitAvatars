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

  ngOnInit() {
    this.getAvatars();
    // this.users = this._http.mockData;
    // console.log("users: ", this.users);
  }

  getAvatars() {
    this._http.getAvatars()
      .subscribe(avatars => {
        this.users = avatars[0];
      });
  }

  checkFollowers(user) {
    if (user.followers) {
      this._http.getfollowers(user.login)
        .subscribe(followers => {
          this.followers = followers[0];
          this.member = followers[2];
          console.log("followers: ", this.followers);
          console.log("member: ", this.member);
        });
      this.showFollowers = true;
    }
  }

  closeModal() {
    this.showFollowers = false;
  }
}
