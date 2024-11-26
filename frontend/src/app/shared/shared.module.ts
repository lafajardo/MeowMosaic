import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';


// UI Widgets
import { PostMobileWidget } from './post-mobile/post-mobile.widget';

@NgModule({
    declarations: [
        PostMobileWidget,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
    ],
    exports: [
        PostMobileWidget,
    ]
})
export class SharedModule{}