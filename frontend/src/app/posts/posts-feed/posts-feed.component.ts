import { Component, signal, Signal, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';
import { PostService } from '../post.services';

@Component({
  selector: 'posts-feed',
  imports: [CommonModule, PostWidget],
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.css']
})
export class PostsFeedComponent implements OnInit {
  posts: WritableSignal<Post[]> = signal([]);

  constructor(private postSVC: PostService) {
    this.posts = this.postSVC.posts;
  }

  ngOnInit(): void {
    // Fetch posts and update the signal
    this.postSVC.getAllPosts();
  }
}

