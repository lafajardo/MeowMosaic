import { Routes } from '@angular/router';

import { FeedPostsComponent } from './feed/feed-posts.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfilePostsComponent } from './profile/profile-posts/profile-posts.component';

export const routes: Routes = [
    {
        path: 'profile',
        title: 'Profile',
        component: ProfilePageComponent,
        children: [
            {
                path: 'acct-info',
                title: 'Account Information',
                component: ProfileInfoComponent,
            },
            {
                path: 'my-posts',
                title: 'My Posts',
                component: ProfilePostsComponent,
            }
        ]
    }, 
    {
        path: 'feed', 
        title: 'Feed Posts',
        component: FeedPostsComponent,
    },
    {
        path: '',
        redirectTo: 'profile/acct-info',
        pathMatch: 'full',
    }
];
