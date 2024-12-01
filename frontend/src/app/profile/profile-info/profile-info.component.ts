import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserEditorComponent } from 'src/app/shared/user-editor/user-editor.component';

@Component({
  selector: 'app-profile-info',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
  user: User = {
    id: 1,
    username: 'test',
    email: 'test@example.com',
    password: 'password123',
  };

  readonly dialog = inject(MatDialog);

  openProfileEditor() {
    const dialogRef = this.dialog.open(UserEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }
}
