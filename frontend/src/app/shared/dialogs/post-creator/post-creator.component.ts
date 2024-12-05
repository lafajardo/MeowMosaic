import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PostService } from 'src/app/posts/post.services';
import { ProfileService } from 'src/app/profile/profile.service';
@Component({
  selector: 'app-post-creator',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
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
  constructor(
    protected postSVC: PostService,
    protected profileSVC: ProfileService, // Inject ProfileService
    ) { };

  createPost() {
    const title = this.newPostForm.value.title;
    const caption = this.newPostForm.value.caption;
    const image = this.newPostForm.value.image;
    const userID = this.profileSVC.myProfile().id;

    if (title && caption && image && userID) {
      this.postSVC.createPost(title,caption,image, userID);
      setTimeout(() => {window.location.reload()}, 500);
      
      console.log("LESSS GOOOO");
    } else {
      console.log("INVALID");
    }
    
  }


}