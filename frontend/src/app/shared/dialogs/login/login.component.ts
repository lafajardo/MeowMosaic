import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'login-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatIcon, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected loginPage: Boolean = true;

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  protected newAccountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = signal(true);

  constructor(protected userSVC: ProfileService) { };

  showPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  switchView() {
    this.loginPage = !this.loginPage;
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (username && password) {
      this.userSVC.login(username, password);
    }
  }

  createAccount() {
    const username = this.newAccountForm.value.username;
    const email = this.newAccountForm.value.email;
    const password = this.newAccountForm.value.password;
    if (username && email && password) {
      const newUser = {
        username: username,
        email: email,
        password: password
      };
      this.userSVC.createAccount(newUser);
    }
  }
}
