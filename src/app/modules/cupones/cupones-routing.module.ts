import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuponesComponent } from './cupones.component';
import { CuponeAddComponent } from './cupone-add/cupone-add.component';
import { CuponeEditComponent } from './cupone-edit/cupone-edit.component';
import { CuponeListComponent } from './cupone-list/cupone-list.component';

const routes: Routes = [
  {
    path: '',
    component: CuponesComponent,
    children: [
      { path: 'register', component: CuponeAddComponent },
      { path: 'list/edit/:id', component: CuponeEditComponent },
      { path: 'list', component: CuponeListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponesRoutingModule {}
