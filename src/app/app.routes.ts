import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/clientes-listado/clientes-listado.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import(
        './modules/cliente-registrar-modificar/cliente-registrar-modificar.component'
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import(
        './modules/cliente-registrar-modificar/cliente-registrar-modificar.component'
      ),
  },
];
