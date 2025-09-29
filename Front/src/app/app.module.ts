import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarUsuarioComponent } from './Pages/Usuario/listar-usuario/listar-usuario.component';
import { EditarPostagemComponent } from './Pages/Postagem/editar-postagem/editar-postagem.component';
import { ListarPostagemComponent } from './Pages/Postagem/listar-postagem/listar-postagem.component';
import { CadastrarPostagemComponent } from './Pages/Postagem/cadastrar-postagem/cadastrar-postagem.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastrarUsuarioComponent } from './Pages/Usuario/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './Pages/Usuario/editar-usuario/editar-usuario.component';
import { ListarSeguidoresComponent } from './Pages/Seguidores/listar-seguidores/listar-seguidores.component';
import { LoginComponent } from './Pages/Usuario/login/login.component';
import { FeedPageComponent } from './Pages/UI/Feed/feed-page/feed-page.component';
import { PerfilPageComponent } from './Pages/UI/Perfil/perfil-page/perfil-page.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    EditarPostagemComponent,
    ListarPostagemComponent,
    CadastrarPostagemComponent,
    ListarSeguidoresComponent,
    LoginComponent,
    FeedPageComponent,
    PerfilPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
