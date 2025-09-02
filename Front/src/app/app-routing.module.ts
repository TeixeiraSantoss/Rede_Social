import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPostagemComponent } from './Pages/Postagem/editar-postagem/editar-postagem.component';
import { ListarPostagemComponent } from './Pages/Postagem/listar-postagem/listar-postagem.component';
import { CadastrarPostagemComponent } from './Pages/Postagem/cadastrar-postagem/cadastrar-postagem.component';
import { ListarUsuarioComponent } from './Pages/Usuario/listar-usuario/listar-usuario.component';
import { CadastrarUsuarioComponent } from './Pages/Usuario/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './Pages/Usuario/editar-usuario/editar-usuario.component';
import { ListarSeguidoresComponent } from './Pages/Seguidores/listar-seguidores/listar-seguidores.component';

const routes: Routes = [
  {
    path: "postagem/listar",
    component: ListarPostagemComponent
  },
  {
    path: "postagem/cadastrar",
    component: CadastrarPostagemComponent
  },
  {
    path: "postagem/editar/:id",
    component: EditarPostagemComponent
  },
  {
    path:"usuario/listar",
    component: ListarUsuarioComponent
  },
  {
    path:"usuario/cadastrar",
    component: CadastrarUsuarioComponent
  },
  {
    path:"usuario/editar/:id",
    component: EditarUsuarioComponent
  },
  {
    path:"seguidores/listarSeguidores/:id",
    component: ListarSeguidoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
