import { ChangeDetectionStrategy, Component, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'delete-account-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
  protected subject: Signal<User> = signal({} as User);

  constructor(private userSVC: ProfileService) { 
    this.subject = this.userSVC.myProfile;
  }

  delete() {
    const user = this.subject();
    if (user && typeof user.id === 'number') {
      this.userSVC.deleteUser(user.id);
      this.userSVC.logout();
    }
  }
}
