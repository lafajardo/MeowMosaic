import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-creator',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatIcon, MatInputModule],
  templateUrl: './post-creator.component.html',
  styleUrl: './post-creator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreatorComponent {

}