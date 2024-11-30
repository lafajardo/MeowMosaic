import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-editor',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatIcon, MatInputModule],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent {

}
