import { Component } from '@angular/core';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';

@Component({
  selector: 'posts-feed',
  imports: [PostWidget],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.css'
})
export class PostsFeedComponent {
  protected post1: Post = {
    id: 0,
    title: "Cute Cat",
    caption: "Just a picture of an adorable cat",
    date: "11/30/24",
    image: "/images/cutecat2.jpg",
    score: 119,
  }
}
