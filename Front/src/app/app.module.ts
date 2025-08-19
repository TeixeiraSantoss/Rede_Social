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

@NgModule({
  declarations: [
    AppComponent,
    ListarUsuarioComponent,
    EditarPostagemComponent,
    ListarPostagemComponent,
    CadastrarPostagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
