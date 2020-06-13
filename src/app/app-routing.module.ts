import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const appRoutes: Routes = [
    {
        path: 'menu',
        loadChildren: './menu/menu.module#MenuModule'
    },
    {
        path: '**',
        redirectTo: 'menu',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
