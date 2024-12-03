import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from './app/profile/profile.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userSVC: ProfileService) {}
  canActivate(): Observable<boolean> {
    return this.userSVC.isAuthenticated().pipe(
      map((auth) => {
        if (auth) {
          return true;
        } else {
          this.router.navigate(['/posts/feed']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/posts/feed']);
        return [false];
      })
    );
  }
}
