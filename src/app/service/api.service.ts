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

  getAvatarById(id) {
    return this.http.get(`${this.uri}/avatars/${id}`);
  }
}
