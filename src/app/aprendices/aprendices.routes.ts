import { Routes } from '@angular/router';
import { AprendicesListComponent } from './components/aprendices-list.component';
import { AprendizFormComponent } from './components/aprendiz-form.component';

export const APRENDICES_ROUTES: Routes = [
  { path: '',           component: AprendicesListComponent },
  { path: 'nuevo',      component: AprendizFormComponent  },
  { path: ':id/editar', component: AprendizFormComponent  },
];
