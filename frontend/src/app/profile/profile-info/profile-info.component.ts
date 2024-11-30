import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-info',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {

}
