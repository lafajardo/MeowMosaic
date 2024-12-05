import { Component, Input, inject, ViewEncapsulation } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PostEditorComponent } from '../../dialogs/post-editor/post-editor.component';
import { Post } from '../../../models/post.model';
import { DeletePostComponent } from '../../dialogs/delete-post/delete-post.component';
import { PostService } from 'src/app/posts/post.services';
import { UpdatePost } from '@shared/types/updatePost';
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

  protected date: string = '';


  ngOnInit() {
    if (this.post.date) {
      this.date = this.post.date.slice(0, 10).split('-').join('/');
    }
  }

  constructor(
    readonly dialog: MatDialog,
    private postSVC: PostService,
  ) { }

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
      }
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
      if (typeof this.post.id != 'undefined' && typeof this.post.score != 'undefined') {
        const updatedPost: UpdatePost = { score: this.post.score - 1 }
        this.postSVC.updatePost(this.post.id, updatedPost);
        window.location.reload();
      }   
    } else {
      this.like = !this.like;
      this.dislike = !this.like;
      if (typeof this.post.id != 'undefined' && typeof this.post.score != 'undefined') {
        const updatedPost: UpdatePost = { score: this.post.score + 1 }
        this.postSVC.updatePost(this.post.id, updatedPost);
        window.location.reload();
      }   
    }
  }

  dislikeUpdate() {
    if (this.dislike) {
      this.dislike = !this.dislike;
      this.like = this.dislike;
      if (typeof this.post.id != 'undefined' && typeof this.post.score != 'undefined') {
        const updatedPost: UpdatePost = { score: this.post.score + 1 }
        this.postSVC.updatePost(this.post.id, updatedPost);
        window.location.reload();
      }   
    } else {
      this.dislike = !this.dislike;
      this.like = !this.dislike;
      if (typeof this.post.id != 'undefined' && typeof this.post.score != 'undefined') {
        const updatedPost: UpdatePost = { score: this.post.score - 1 }
        this.postSVC.updatePost(this.post.id, updatedPost);
        window.location.reload();
      }   
    }
  }
}
