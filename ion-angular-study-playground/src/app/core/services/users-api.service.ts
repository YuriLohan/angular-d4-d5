import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateUserPayload, Post, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/users/' + id + '/posts');
  }

  createUser(payload: CreateUserPayload): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/users', payload);
  }

  deleteUser(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }
}
