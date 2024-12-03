import { Routes } from '@angular/router';

import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfilePostsComponent } from './profile/profile-posts/profile-posts.component';
import { PostsPageComponent } from './posts/posts-page/posts-page.component';
import { PostsFeedComponent } from './posts/posts-feed/posts-feed.component';
import { PostsLeaderboardComponent } from './posts/posts-leaderboard/posts-leaderboard.component';

import { AuthGuard } from 'src/auth.guard';

export const routes: Routes = [
    {
        path: 'profile',
        title: 'Profile',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
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
        path: 'posts',
        title: 'Posts',
        component: PostsPageComponent,
        children: [
            {
                path: 'feed',
                title: 'Feed',
                component: PostsFeedComponent,
            },
            {
                path: 'leaderboard',
                title: 'Leaderboard',
                component: PostsLeaderboardComponent,
            }
        ]
    },
    {
        path: '',
        redirectTo: '/posts/feed',
        pathMatch: 'full',
    }
];