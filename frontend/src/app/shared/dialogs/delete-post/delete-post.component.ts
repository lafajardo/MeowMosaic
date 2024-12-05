import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PostService } from 'src/app/posts/post.services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete-post-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePostComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private data: { postID: number }, 
    private postSVC: PostService,
    private dialogRef: MatDialogRef<DeletePostComponent> 

  ) {}

  delete() {
    const postID = this.data.postID;
    if (postID) {
      this.postSVC.deletePost(postID);
      console.log(`Deleted post with ID: ${postID}`);
      this.dialogRef.close(true); // Close dialog and indicate success
    } else {
      console.error('Post ID is missing!');
      this.dialogRef.close(false); // Close dialog and indicate failure
    }
  }
}



