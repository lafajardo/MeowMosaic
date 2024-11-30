import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';

import { MiniNavButton } from '../../models/mini-nav-button.model';

@Component({
  selector: 'mini-nav-widget',
  templateUrl: './mini-nav.widget.html',
  styleUrl: './mini-nav.widget.css',
  imports: [MatButtonModule, MatDivider, RouterLink],
})
export class MiniNavWidget {
    @Input() buttonList!: Array<MiniNavButton>;
}
