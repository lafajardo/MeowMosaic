import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
  posts: WritableSignal<Post[]> = signal([]);

  constructor(private postSVC: PostService) {
    this.posts = this.postSVC.topPosts;
  }

  ngOnInit(): void {
    this.postSVC.getTopFivePosts();
  }
}
