import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPostagemComponent } from './Pages/Postagem/editar-postagem/editar-postagem.component';
import { ListarPostagemComponent } from './Pages/Postagem/listar-postagem/listar-postagem.component';
import { CadastrarPostagemComponent } from './Pages/Postagem/cadastrar-postagem/cadastrar-postagem.component';
import { ListarUsuarioComponent } from './Pages/Usuario/listar-usuario/listar-usuario.component';
import { CadastrarUsuarioComponent } from './Pages/Usuario/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './Pages/Usuario/editar-usuario/editar-usuario.component';
import { ListarSeguidoresComponent } from './Pages/Seguidores/listar-seguidores/listar-seguidores.component';
import { LoginComponent } from './Pages/Usuario/login/login.component';
import { FeedPageComponent } from './Pages/UI/Feed/feed-page/feed-page.component';
import { PerfilPageComponent } from './Pages/UI/Perfil/perfil-page/perfil-page.component';
import { ListarPostagemSeguidosComponent } from './Pages/Postagem/listar-postagem-seguidos/listar-postagem-seguidos.component';
import { PerfilUsuariosComponent } from './Pages/UI/Perfil/perfil-usuarios/perfil-usuarios.component';
import { ListarSeguindoComponent } from './Pages/Seguidores/listar-seguindo/listar-seguindo.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
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
  },
  {
    path:"seguidores/listarSeguidos/:id",
    component: ListarSeguindoComponent
  },
  {
    path:"feed",
    component: FeedPageComponent
  },
  {
    path:"perfil",
    component: PerfilPageComponent
  },
  {
    path:"perfil/:id",
    component: PerfilUsuariosComponent
  },
  {
    path:"postagem/listarSeguidos/:userId",
    component: ListarPostagemSeguidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
