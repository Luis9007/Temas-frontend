import { Routes } from '@angular/router';
import { TemasListComponent } from './components/temas-list.component';
import { TemaFormComponent } from './components/tema-form.component';

export const TEMAS_ROUTES: Routes = [
  { path: '',           component: TemasListComponent },
  { path: 'nuevo',      component: TemaFormComponent  },
  { path: ':id/editar', component: TemaFormComponent  },
];
