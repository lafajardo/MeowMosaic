import { Component, Signal, signal } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'profile-posts',
  imports: [PostWidget],
  templateUrl: './profile-posts.component.html',
  styleUrl: './profile-posts.component.css'
})
export class ProfilePostsComponent {
  protected posts: Signal<Post[]> = signal([]);

  constructor(protected userSVC: ProfileService) {
    this.posts = this.userSVC.myPosts;
  }
}
