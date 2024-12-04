import { Component, signal, Signal, OnInit } from '@angular/core';
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
  posts: Post[] = [];

  constructor(private postSVC: PostService) {}

  ngOnInit(): void {
    // Fetch posts and update the signal
    this.postSVC.getAllPosts();
    
    // Directly access the signal's value
    this.posts = this.postSVC.posts(); // This directly gives the current value of posts
  }
}

