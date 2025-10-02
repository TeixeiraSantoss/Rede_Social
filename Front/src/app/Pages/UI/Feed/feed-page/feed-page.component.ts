import { UsuarioReadDTO } from './../../../../DTO/UsuarioDTO/UsuarioReadDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioEditDTO } from 'src/app/DTO/UsuarioDTO/UsuarioEditDTO';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent {
  constructor(private client: HttpClient, private router: Router, private auth: AuthService){}

  usuario: UsuarioReadDTO | null = null

  ngOnInit():void{
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)
  }

  irParaCadastrar():void{
    this.router.navigate(["postagem/cadastrar"]);
  }

  navegarPerfilPage():void{
    this.router.navigate(["perfil"])
  }
  
}
