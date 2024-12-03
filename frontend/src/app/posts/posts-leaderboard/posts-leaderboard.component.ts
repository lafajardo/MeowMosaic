import { Component } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';

@Component({
  selector: 'posts-leaderboard',
  imports: [PostWidget],
  templateUrl: './posts-leaderboard.component.html',
  styleUrl: './posts-leaderboard.component.css'
})
export class PostsLeaderboardComponent {
  protected post1: Post = {
    id: 0,
    title: "Cute Cat",
    caption: "Just a picture of an adorable cat",
    date: "11/30/24",
    image: "/images/cutecat2.jpg",
    score: 119,
  }
}
