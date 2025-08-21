import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPostagemComponent } from './Pages/Postagem/editar-postagem/editar-postagem.component';
import { ListarPostagemComponent } from './Pages/Postagem/listar-postagem/listar-postagem.component';

const routes: Routes = [
  {
    path: "postagem/listar",
    component: ListarPostagemComponent
  },
  {
    path: "postagem/editar/:id",
    component: EditarPostagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
