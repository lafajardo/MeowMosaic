import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '@shared/types/createUser';
import { UpdateUser } from '@shared/types/updateUser';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  myProfile: WritableSignal<User> = signal({} as User);
  myPosts: WritableSignal<Post[]> = signal([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  // Connected.
  login(username: string, password: string) {
    return this.http.post<{ message: string, user: User }>('http://localhost:3000/api/userAPI/login', { username, password }, { withCredentials: true }).subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        this.router.navigate(['/profile/acct-info'])
        this.snackBar.open(`Logged in`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open(`Invalid username or password`, 'Close', { duration: 3000 });
      }
    });
  }    

  validateEmail(email: string) {
    const url = 'http://localhost:3000/api/userAPI/verify-email';
    return this.http.post<{ result: string }>(url, { email }).pipe(
      map((response) => response.result === 'ok'),
      catchError(() => {
        this.snackBar.open('Error validating email. Please try again later.', 'Close', { duration: 3000 });
        return of(false);
      })
    );
  }

  showError(message: string){
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  // Connected.
  createAccount(newUser: CreateUser) {
    return this.http.post<{ message: string, userAPI: User }>('http://localhost:3000/api/userAPI/create-acct', newUser).subscribe({
      next: () => {
        this.snackBar.open(`Account created, please login`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open(`Provided username or email already in use`, 'Close', { duration: 3000 });
      }
    });
  }


  getUserPosts(userID: number) {
    return this.http.get<{ message: string, userAPI: { posts: Post[] } }>(`http://localhost:3000/api/userAPI/posts/${userID}`).subscribe({
      next: (response) => {
        this.myPosts.set(response.userAPI.posts);
      },
      error: (err) => {
        console.error('Error retrieving user posts: ', err);
      }
    });
  }

  // Connected.
  logout() {
    return this.http.get<{ message: string }>('http://localhost:3000/api/userAPI/logout', { withCredentials: true }).subscribe({
      next: () => {
        this.myProfile.set({});
        this.snackBar.open(`Logged out`, 'Close', { duration: 3000 });
      },
      error: () => {
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
        catchError(() => {
          this.snackBar.open(`Make an account or login to use this feature`, 'Close', { duration: 3000 });
          return of(false);
        })
      );
  }

  updateUser(userID: number, updatedUser: UpdateUser) {
    return this.http.put<{ message: string, user: User }>(`http://localhost:3000/api/userAPI/${userID}`, updatedUser).subscribe({
      next: (response) => {
        this.myProfile.set(response.user);
        this.snackBar.open(`Profile updated`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open(`Error updating profile`, 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(userID: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/userAPI/${userID}`).subscribe({
      next: () => {
        this.snackBar.open(`Account deleted`, 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open(`Error deleting account`, 'Close', { duration: 3000 });
      }
    });
  }
}
