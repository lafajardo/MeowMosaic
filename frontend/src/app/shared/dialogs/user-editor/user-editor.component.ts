import { Component, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateUser } from '@shared/types/updateUser';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'user-editor-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.css',
})
export class UserEditorComponent {
  protected subject: Signal<User> = signal({} as User);

  protected loginEditorForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private userSVC: ProfileService,
  ) {
    this.subject = this.userSVC.myProfile;
    this.setFormValues();
  }

  setFormValues() {
    const user = this.subject();
    if (user) {
      this.loginEditorForm.setValue({
        username: user.username || '',
        email: user.email || '',
        password: ''
      });
    }
  }

  update() {
    const user = this.subject();
    const updatedUser: UpdateUser = {};
    updatedUser.username = this.loginEditorForm.value.username ? this.loginEditorForm.value.username : undefined;
    updatedUser.email = this.loginEditorForm.value.email ? this.loginEditorForm.value.email : undefined;
    updatedUser.password = this.loginEditorForm.value.password ? this.loginEditorForm.value.password : undefined;
    if (user && typeof user.id === 'number') {
      this.userSVC.updateUser(user.id, updatedUser);
    }
  }
}
