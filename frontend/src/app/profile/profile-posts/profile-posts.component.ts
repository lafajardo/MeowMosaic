import { Component } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/post/post.widget';

@Component({
  selector: 'app-profile-posts',
  imports: [PostWidget],
  templateUrl: './profile-posts.component.html',
  styleUrl: './profile-posts.component.css'
})
export class ProfilePostsComponent {
  protected post1: Post = {
    id: 0,
    title: "Cute Cat",
    caption: "Just a picture of an adorable cat",
    date: "11/30/24",
    image: "/cutecat2.jpg",
    score: 0,
}
}
