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

  ngOnInit() {
    this.getAvatars();
  }

  getAvatars(): void {
    this._http.getAvatars()
      .subscribe(avatars => {
        this.users = avatars;
        console.log("avatars: ", this.users);
      });
  }
}
