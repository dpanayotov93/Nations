import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { NationComponent } from './pages/nation/nation.component';
import { AdminComponent } from './pages/admin/admin.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'nation/:id',
    component: NationComponent,
    canActivate: [
      AuthGuard
    ]
  },  
  {
    path: 'admin',
    canActivate: [
      AuthGuard,
      AdminGuard
    ],
    children: [
      {
        path: '',
        component: AdminComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
    AdminGuard
  ],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
