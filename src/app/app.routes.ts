import { Routes } from '@angular/router';
import { ListComponent } from './registros/list/list';
import { FormComponent } from './registros/form/form';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'registros/nuevo', component: FormComponent },
    { path: 'registros/editar/:id', component: FormComponent }
];
