import { Component, Input} from '@angular/core';
// import { Component, Input,inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
// import { MatDialog } from '@angular/material/dialog';
// import { PostEditorComponent } from '../../shared/post-editor/post-editor.component';
import { Post } from '../../models/post.model';

@Component({
  selector: 'post-widget',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './post.widget.html',
  styleUrl: './post.widget.css'
})
export class PostWidget {
  @Input() post!: Post;
 
  // readonly dialog = inject(MatDialog);

  // openPostEditor() {
  //   const dialogRef = this.dialog.open(PostEditorComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   }); 
  // }
}
