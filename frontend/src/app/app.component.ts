import { Component,inject} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';
import { PostCreatorComponent } from './shared/post-creator/post-creator.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
})
export class AppComponent {
  readonly dialog = inject(MatDialog);

  openPostCreator() {
    const dialogRef = this.dialog.open(PostCreatorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }}
