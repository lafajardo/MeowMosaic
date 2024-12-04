import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.services';
import { Post } from '../../models/post.model';
import { PostWidget } from '../../shared/widgets/post/post.widget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'posts-leaderboard',
  imports: [CommonModule, PostWidget],
  templateUrl: './posts-leaderboard.component.html',
  styleUrl: './posts-leaderboard.component.css'
})
export class PostsLeaderboardComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postSVC: PostService) {}

  ngOnInit(): void {
    // Fetch posts and update the signal
    this.postSVC.getTopFivePosts();
    
    // Directly access the signal's value
    this.posts = this.postSVC.topPosts(); // This directly gives the current value of posts
  }
}
