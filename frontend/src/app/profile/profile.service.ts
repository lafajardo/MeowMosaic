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
    return this.http.post<{ message: string, user: User }>('http://localhost:3000/api/userAPI/login', { username, password }).subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        console.log('Successfully logged in: ', response);
      },
      error: (err) => {
        console.error('Error logging in: ', err);
      }
    });
  }

  createAccount(newUser: CreateUser) {
    return this.http.post<{ message: string, userAPI: User }>('http://localhost:3000/api/userAPI/create-acct', newUser).subscribe({
      next: (response) => {
        console.log('Successfully created account: ', response);
      },
      error: (err) => {
        console.error('Error creating account: ', err);
      }
    });
  }

  getUserPosts(userID: number) {
    return this.http.get<{ message: string, userAPI: { posts: Post[] } }>(`http://localhost:3000/api/userAPI/posts/${userID}`).subscribe({
      next: (response) => {
        console.log('Successfully retrieved user posts: ', response);
      },
      error: (err) => {
        console.error('Error retrieving user posts: ', err);
      }
    });
  }

  logout() {
    return this.http.get<{ message: string }>('http://localhost:3000/api/userAPI/logout').subscribe({
      next: (response) => {
        this.myProfile.set({});
        console.log('Successfully logged out: ', response);
      },
      error: (err) => {
        console.error('Error logging out: ', err);
      }
    });
  }

  isAuthenticated() {
    return this.http.get<{ message: string, user: User }>('http://localhost:3000/api/userAPI/authenticated').subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        console.log('User authenticated: ', response);
      },
      error: (err) => {
        console.error('User not authenticated: ', err);
      }
    });
  }

  updateUser(userID: number, updatedUser: UpdateUser) {
    return this.http.put<{ message: string, userAPI: User }>(`http://localhost:3000/api/userAPI/${userID}`, updatedUser).subscribe({
      next: (response) => {
        console.log('Successfully updated user: ', response);
      },
      error: (err) => {
        console.error('Error updating user: ', err);
      }
    });
  }

  deleteUser(userID: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/userAPI/${userID}`).subscribe({
      next: (response) => {
        console.log('Successfully deleted user: ', response);
      },
      error: (err) => {
        console.error('Error deleting user: ', err);
      }
    });
  }
}
