import { Component, Input, inject, ViewEncapsulation } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PostEditorComponent } from '../../dialogs/post-editor/post-editor.component';
import { Post } from '../../../models/post.model';
import { DeletePostComponent } from '../../dialogs/delete-post/delete-post.component';

@Component({
  selector: 'post-widget',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './post.widget.html',
  styleUrl: './post.widget.css',
  encapsulation: ViewEncapsulation.None,

})
export class PostWidget {
  @Input() post!: Post;

  @Input() canEdit!: Boolean;

  protected like: boolean = false;

  protected dislike: boolean = false;

  readonly dialog = inject(MatDialog);

  openPostEditor() {
    const dialogRef = this.dialog.open(PostEditorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog() {
    if (!this.post?.id) {
      console.error('Post ID is missing!');
      return;
    }
  
    const dialogRef = this.dialog.open(DeletePostComponent, {
      data: { postID: this.post.id }, // Pass the post ID to the dialog, will retrieve in delete-post.component.ts
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Post with ID ${this.post.id} deleted.`);
      } else {
        console.log('Post deletion was canceled.');
      }
    });
  }

  likeUpdate() {
    if (this.like) {
      this.like = !this.like;
      this.dislike = this.like;
      this.post.score;
    } else {
      this.like = !this.like;
      this.dislike = !this.like;
    }
  }

  dislikeUpdate() {
    if (this.dislike) {
      this.dislike = !this.dislike;
      this.like = this.dislike;
    } else {
      this.dislike = !this.dislike;
      this.like = !this.dislike;
    }
  }
}
