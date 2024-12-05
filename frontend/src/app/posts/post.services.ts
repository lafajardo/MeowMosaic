import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UpdatePost } from '@shared/types/updatePost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: WritableSignal<Post[]> = signal([]);
  topPosts: WritableSignal<Post[]> = signal([]);

  constructor(protected http: HttpClient) {}

  createPost(title: string, caption: string, image: string, userID: number) {
    return this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/postAPI/create-post', { title, caption, image, userID}).subscribe({
      next: (response) => {
        console.log('Successfully created post: ', response);
      },
      error: (err) => {
        console.error('Error creating post: ', err);
      }
    });
  }

  getAllPosts() {
    return this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/postAPI/feed').subscribe({
      next: (response) => {
        this.posts.set(response.posts);
        console.log('Successfully retrieved all posts: ', response);
      },
      error: (err) => {
        console.error('Error retrieving all posts: ', err);
      }
    });
  }

  getTopFivePosts() {
    return this.http.get<{ message: string, topPosts: Post[] }>('http://localhost:3000/api/postAPI/leaderboard').subscribe({
      next: (response) => {
        this.topPosts.set(response.topPosts);
        console.log('Successfully retrieved top posts: ', response);
      },
      error: (err) => {
        console.error('Error retrieving top posts: ', err);
      }
    });
  }

  updatePost(postID: number, updatedPost: UpdatePost) {
    return this.http.put<{ message: string, post: Post }>(`http://localhost:3000/api/postAPI/${postID}`, updatedPost).subscribe({
      next: (response) => {
        console.log('Successfully updated post: ', response);
      },
      error: (err) => {
        console.error('Error updating post: ', err);
      }
    });
  }
  
  deletePost(postID: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/postAPI/${postID}`).subscribe({
      next: (response) => {
        console.log('Successfully deleted post: ', response);
      },
      error: (err) => {
        console.error('Error deleting post: ', err);
      }
    });
  }
}