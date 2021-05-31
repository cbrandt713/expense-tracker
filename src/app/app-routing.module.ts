import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'expenses', loadChildren: () => import('./expense-manager/expense-manager.module').then((m) => m.ExpenseManagerModule) },
    { path: 'groups', loadChildren: () => import('./group-manager/group-manager.module').then((m) => m.GroupManagerModule) },
    { path: 'users', loadChildren: () => import('./user-manager/user-manager.module').then((m) => m.UserManagerModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
