import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/navbar/navbar').then(m => m.Navbar)
    },
];
