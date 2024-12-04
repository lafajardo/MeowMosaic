import { Component, WritableSignal, signal } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';
import { ProfileService } from '../profile.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'profile-posts',
  imports: [PostWidget],
  templateUrl: './profile-posts.component.html',
  styleUrl: './profile-posts.component.css'
})
export class ProfilePostsComponent {
  protected subject: WritableSignal<User> = signal({} as User);
  protected posts: WritableSignal<Post[]> = signal([]);

  constructor(protected userSVC: ProfileService) {
    this.subject = this.userSVC.myProfile;
    this.posts = this.userSVC.myPosts;
  }

  ngOnInit() {
    this.userSVC.getUserPosts(this.subject().id?? -1);
  }
}
