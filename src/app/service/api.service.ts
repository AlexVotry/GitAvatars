import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private uri = environment.uri;

  constructor(private http: HttpClient) { }

  getAvatars() {
    return this.http.get(`${this.uri}/avatars`);
  }
  getDetails(user) {
    return this.http.get(`${this.uri}/avatars/${user}`);
  }
  getfollowers(login) {
    return this.http.get(`${this.uri}/followers/${login}`);
  }
  searchAvatars(q, filter) {
    return this.http.get(`${this.uri}/search/${filter}/${q}`)
  }


  public mockData = [
    {
      avatar: "https://avatars3.githubusercontent.com/u/614?v=4",
      details: "https://api.github.com/users/andykent",
      followers: "https://api.github.com/users/andykent/followers",
      id: 1008,
      login: "andykent"
    },
    {
      avatar: "https://avatars0.githubusercontent.com/u/1?v=4",
      details: "https://api.github.com/users/mojombo",
      followers: null,
      id: 1015,
      login: "mojombo",
    },
    {
      avatar: "https://avatars3.githubusercontent.com/u/665?v=4",
      details: "https://api.github.com/users/zachinglis",
      followers: "https://api.github.com/users/zachinglis/followers",
      id: 1017,
      login: "zachinglis"
    }
  ]
}
