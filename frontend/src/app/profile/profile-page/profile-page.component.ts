import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../../shared/dialogs/login/login.component';
import { MiniNavWidget } from '../../shared/widgets/mini-nav/mini-nav.widget';
import { MiniNavButton } from '../../models/mini-nav-button.model';
import { PostEditorComponent } from '../../shared/dialogs/post-editor/post-editor.component';

@Component({
  selector: 'profile-page',
  imports: [MatButtonModule, MiniNavWidget, RouterOutlet],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  protected buttonList: Array<MiniNavButton> = [
    { id: 0, title: 'Profile', path: 'acct-info' },
    { id: 1, title: 'My Posts', path: 'my-posts' },
  ];

  readonly dialog = inject(MatDialog);

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPostEditor() {
    const dialogRef = this.dialog.open(PostEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
