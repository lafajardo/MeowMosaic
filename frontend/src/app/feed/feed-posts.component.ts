import { Component } from '@angular/core';

import { Post } from '../models/post.model';
import { PostWidget } from '../shared/post/post.widget';

@Component({
  selector: 'feed-posts',
  imports: [PostWidget],
  templateUrl: './feed-posts.component.html',
  styleUrl: './feed-posts.component.css'
})

// CURRENT CODE IS FILLER 
// TODO : GO THROUGH POSTS TABLE & LOOP and RETRIEVE ALL POSTS & FEED TO HTML
    export class FeedPostsComponent {
    protected post1: Post = {
        id: 0,
        title: "My Shitty ass cat",
        caption: "Just a picture of an adorable cat",
        date: "11/30/24",
        image: "/cutecat2.jpg",
        score: 0,
    }
    protected post2: Post = {
        id: 1,
        title: "A not very cute cat",
        caption: "Just a picture of an adorable cat",
        date: "11/10/24",
        image: "/cutecat2.jpg",
        score: 0,
    }
    protected post3: Post = {
        id: 2,
        title: "Cute Cat",
        caption: "Just a picture of an adorable cat",
        date: "11/20/24",
        image: "/cutecat2.jpg",
        score: 0,
    }
}
