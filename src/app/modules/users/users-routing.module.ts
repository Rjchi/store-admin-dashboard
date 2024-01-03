import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

/**---------------------------------------------------------
 * | Cuando creamos un modulo en la primera ruta siempre va
 * | El componente centrar
 * ---------------------------------------------------------*/

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [ // Aqui van los componentes hijos de este modulo
      {
        path: 'list',
        component: UsersListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
