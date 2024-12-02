import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'post-editor-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent {
  protected postEditorForm = new FormGroup({
    title: new FormControl(''),
    caption: new FormControl(''),
  });
}