import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostagemReadDTO } from 'src/app/DTO/PostagemDTO/PostagemReadDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-listar-postagem-seguidos',
  templateUrl: './listar-postagem-seguidos.component.html',
  styleUrls: ['./listar-postagem-seguidos.component.scss']
})
export class ListarPostagemSeguidosComponent {
  constructor(private client: HttpClient, private auth: AuthService){}

  usuario: UsuarioReadDTO | null = null

  postagens: PostagemReadDTO[] = []
  
  ngOnInit():void{
    
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)

    if(this.usuario != null){
      for(let i = 0; i <= this.usuario?.seguindo.length - 1; i++){
        console.log(this.usuario?.seguindo[i])
      }
    }
    
  }



}
