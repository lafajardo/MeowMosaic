import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'user-editor-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.css',
})
export class UserEditorComponent {
  protected loginEditorForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });
}
