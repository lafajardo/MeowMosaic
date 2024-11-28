import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'mini-nav-widget',
  templateUrl: './mini-nav.widget.html',
  styleUrl: './mini-nav.widget.css',
  imports: [MatButtonModule, MatDivider],
})
export class MiniNavWidget {}
