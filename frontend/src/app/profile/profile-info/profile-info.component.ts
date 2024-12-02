import { Component, signal, Signal } from '@angular/core';

import { User } from '../../models/user.model';
import { ProfileService } from '../profile.service';
import { ProfileWidget } from 'src/app/shared/widgets/profile/profile.widget';

@Component({
  selector: 'profile-info',
  imports: [ProfileWidget],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
  protected subject: Signal<User> = signal({} as User);

  constructor(protected userSVC: ProfileService) {
    this.subject = this.userSVC.myProfile;
  }
}
