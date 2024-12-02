/*
The mobile-site is composed of three main parts: a main-page, a sub-page, and the sub-page contents. To 
create the navigation bar for the sub-page, a widget called mini-nav-bar was created. It takes an 
array of MiniNavButton objects which contain an id for tracking in the for-loop, title to be displayed, 
and path for the RouterLink.
*/

export interface MiniNavButton {
    id: number;
    title: string;
    path: string;
}