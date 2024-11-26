import { Component, Input } from '@angular/core';
import { Post } from '../../post.model';

@Component({
  selector: 'post-mobile-widget',
  templateUrl: './post-mobile.widget.html',
  styleUrl: './post-mobile.widget.css'
})
export class PostMobileWidget {
  @Input() post!: Post;
}
