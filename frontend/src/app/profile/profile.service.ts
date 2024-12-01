import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '@shared/types/createUser';
import { UpdateUser } from '@shared/types/updateUser';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  myProfile: WritableSignal<User> = signal({} as User);
  myPosts: WritableSignal<Post[]> = signal([]);

  constructor(protected http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<User>('/api/user/login', { username, password }).pipe(
      tap(user => {
        this.myProfile.set(user);
      })
    );
  }

  createAccount(newUser: CreateUser) {
    return this.http.post<{ message: string, user: User }>('/api/user/create-acct', newUser).pipe(
      tap(response => {
        this.myProfile.set(response.user);
      })
    );
  }

  getUserByID(userID: number) {
    return this.http.get<{ message: string, user: User }>(`/api/user/${userID}`).pipe(
      tap(response => {
        this.myProfile.set(response.user);
      })
    );
  }

  getUserPosts(userID: number) {
    return this.http.get<{ message: string, user: { posts: Post[] } }>(`/api/user/posts/${userID}`).pipe(
      tap(response => {
        this.myPosts.set(response.user.posts);
      })
    );
  }

  logout() {
    return this.http.get<{ message: string }>('/api/user/logout').pipe(
      tap(() => {
        this.myProfile.set({} as User);
        this.myPosts.set([]);
      })
    );
  }

  isAuthenticated() {
    return this.http.get<{ message: string }>('/api/user/authenticated');
  }

  updateUser(userID: number, updatedUser: UpdateUser) {
    return this.http.put<{ message: string, user: User }>(`/api/user/${userID}`, updatedUser).pipe(
      tap(response => {
        this.myProfile.set(response.user);
      })
    );
  }

  deleteUser(userID: number) {
    return this.http.delete<{ message: string }>(`/api/user/${userID}`).pipe(
      tap(() => {
        this.myProfile.set({} as User);
        this.myPosts.set([]);
      })
    );
  }
}
