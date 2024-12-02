import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'delete-account-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
}
