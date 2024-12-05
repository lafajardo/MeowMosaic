import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileService } from 'src/app/profile/profile.service';
import { PostService } from 'src/app/posts/post.services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatePost } from '@shared/types/updatePost';
@Component({
  selector: 'post-editor-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorComponent {
  protected postEditorForm = new FormGroup({
    title: new FormControl(''),
    caption: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { postID: number, score: number },
    protected postSVC: PostService,
    protected profileSVC: ProfileService // Inject ProfileService
  ) { };

  updatePost() {
    const updatedPost: UpdatePost = {};

    const postID = this.data.postID;
    updatedPost.title = this.postEditorForm.value.title ? this.postEditorForm.value.title : undefined;
    updatedPost.caption = this.postEditorForm.value.caption ? this.postEditorForm.value.caption : undefined;
    
    this.postSVC.updatePost(postID, updatedPost);
    window.location.reload();
  }
}