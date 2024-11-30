import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Post } from '../../models/post.model';

@Component({
  selector: 'post-widget',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './post.widget.html',
  styleUrl: './post.widget.css'
})
export class PostWidget {
  @Input() post!: Post;
}
