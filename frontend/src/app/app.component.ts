import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { PostCreatorComponent } from './shared/dialogs/post-creator/post-creator.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/dialogs/login/login.component';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    protected userSVC: ProfileService,
  ) { }

  openPostCreator() {
    this.userSVC.isAuthenticated().subscribe((auth) => {
      if (auth) {
        this.dialog.open(PostCreatorComponent);
      } else {
        this.router.navigate(['/posts/feed']);
      }
    });
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openProfile() {
    this.userSVC.isAuthenticated().subscribe((auth) => {
      if (!auth) {
        this.router.navigate(['posts/feed']);
      } else {
        this.router.navigate(['/profile/acct-info']);
      }
    });
  }

  logout() {
    this.userSVC.isAuthenticated().subscribe((auth) => {
      if (auth) {
        this.userSVC.logout();
      } 
    });
  }
}
