import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MiniNavWidget } from '../../shared/widgets/mini-nav/mini-nav.widget';
import { MiniNavButton } from '../../models/mini-nav-button.model';

@Component({
  selector: 'posts-page',
  imports: [MatButtonModule, MiniNavWidget, RouterOutlet],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent {
  protected buttonList: Array<MiniNavButton> = [
    { id: 0, title: 'Feed', path: 'feed' },
    { id: 1, title: 'Leaderboard', path: 'leaderboard' },
  ];
}
