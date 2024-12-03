import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PostService } from 'src/app/posts/post.services';
@Component({
  selector: 'app-post-creator',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './post-creator.component.html',
  styleUrl: './post-creator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreatorComponent {

  protected newPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    caption: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(protected postSVC: PostService) { };

  createPost() {
    const title = this.newPostForm.value.title;
    const caption = this.newPostForm.value.caption;
    const image = this.newPostForm.value.image;
    if (title && caption && image) {
      // const newPost = {
      //   title: title,
      //   caption: caption,
      //   image: image
      // };
      this.postSVC.createPost(title,caption,image);
    }
  }


}