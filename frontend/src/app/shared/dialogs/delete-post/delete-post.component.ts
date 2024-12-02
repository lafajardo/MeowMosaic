import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'delete-post-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePostComponent {

}
