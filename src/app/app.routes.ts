import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Portalequipos } from './portalequipos/portalequipos';
import { Alumnos } from './alumnos/alumnos';
import { Portaljugadores } from './portaljugadores/portaljugadores';

export const routes: Routes = [
     {path: '', component: Alumnos},
     {path: 'equipo', component: Portalequipos},
     {path: 'jugador', component: Portaljugadores},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }