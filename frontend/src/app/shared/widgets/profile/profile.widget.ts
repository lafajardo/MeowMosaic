import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserEditorComponent } from 'src/app/shared/dialogs/user-editor/user-editor.component';
import { DeleteAccountComponent } from 'src/app/shared/dialogs/delete-account/delete-account.component';

@Component({
    selector: 'profile-widget',
    imports: [MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './profile.widget.html',
    styleUrl: './profile.widget.css'
})
export class ProfileWidget {
    @Input() subject!: User;
    readonly dialog = inject(MatDialog);

    openProfileEditor() {
        const dialogRef = this.dialog.open(UserEditorComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openDeleteDialog() {
        this.dialog.open(DeleteAccountComponent);
    }
}