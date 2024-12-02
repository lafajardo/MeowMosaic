import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/dialogs/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
})
export class AppComponent {
  readonly dialog = inject(MatDialog);

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }
}
