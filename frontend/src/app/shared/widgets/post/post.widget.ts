import { Component, Input, inject, ViewEncapsulation } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PostEditorComponent } from '../../dialogs/post-editor/post-editor.component';
import { Post } from '../../../models/post.model';
import { DeletePostComponent } from '../../dialogs/delete-post/delete-post.component';
import { PostService } from 'src/app/posts/post.services';
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

  constructor(private postSVC: PostService) {}

  openPostEditor() {
    if (!this.post?.id) {
      console.log("Post ID is missing!");
      return;
    }

    const dialogRef = this.dialog.open(PostEditorComponent, {
      data: { postID: this.post.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Post with ID ${this.post.id} updated.`);
      } else {
        console.log('Post update was canceled.');
      }    });
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
      // this.postSVC.updatePost(this.post.id, this.post.title, this.post.caption, this.post.score - 1);
      // this.post.score -= 1;     
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
