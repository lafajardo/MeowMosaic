import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '@shared/types/createUser';
import { UpdateUser } from '@shared/types/updateUser';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostCreatorComponent } from '../shared/dialogs/post-creator/post-creator.component';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  myProfile: WritableSignal<User> = signal({} as User);
  myPosts: WritableSignal<Post[]> = signal([]);

  constructor(
    private dialog: MatDialog,
    protected http: HttpClient,
    private router: Router,
    protected snackBar: MatSnackBar,
  ) { }

  // Connected.
  login(username: string, password: string) {
    return this.http.post<{ message: string, user: User }>('http://localhost:3000/api/userAPI/login', { username, password }, { withCredentials: true }).subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        console.log('Successfully logged in: ', response);
        this.snackBar.open(`Logged in`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error logging in: ', err);
        this.snackBar.open(`Invalid username or password`, 'Close', { duration: 3000 });
      }
    });
  }

  // Connected.
  createAccount(newUser: CreateUser) {
    return this.http.post<{ message: string, userAPI: User }>('http://localhost:3000/api/userAPI/create-acct', newUser).subscribe({
      next: (response) => {
        console.log('Successfully created account: ', response);
        this.snackBar.open(`Account created, please login`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error creating account: ', err);
        this.snackBar.open(`Provided username or email already in use`, 'Close', { duration: 3000 });
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

  // Connected.
  logout() {
    return this.http.get<{ message: string }>('http://localhost:3000/api/userAPI/logout', { withCredentials: true }).subscribe({
      next: (response) => {
        this.myProfile.set({});
        console.log('Successfully logged out: ', response);
        this.snackBar.open(`Logged out`, 'Close', { duration: 3000 });
        this.router.navigate(['/posts/feed']);
      },
      error: (err) => {
        console.error('Error logging out: ', err);
        this.snackBar.open(`Error loggingout`, 'Close', { duration: 3000 });
      }
    });
  }

  isAuthenticated() {
    return this.http.get<{ message: string, user: User }>('http://localhost:3000/api/userAPI/authenticated', { withCredentials: true })
      .pipe(
        map((response) => {
          if (response.user) {
            this.myProfile.set(response.user);
            return true;
          } else {
            return false;
          }
        }),
        catchError((err) => {
          this.snackBar.open(`Make an account or login to use this feature`, 'Close', { duration: 3000 });
          return of(false);
        })
      );
  }

  updateUser(userID: number, updatedUser: UpdateUser) {
    return this.http.put<{ message: string, user: User }>(`http://localhost:3000/api/userAPI/${userID}`, updatedUser).subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        console.log('Successfully updated user: ', response);
        this.snackBar.open(`Profile updated`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error updating user: ', err);
        this.snackBar.open(`Error updating profile`, 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(userID: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/userAPI/${userID}`).subscribe({
      next: (response) => {
        console.log('Successfully deleted user: ', response);
        this.snackBar.open(`Account deleted`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error deleting user: ', err);
        this.snackBar.open(`Error deleting account`, 'Close', { duration: 3000 });
      }
    });
  }
}
