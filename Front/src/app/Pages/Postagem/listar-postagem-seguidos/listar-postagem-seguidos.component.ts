import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostagemReadDTO } from 'src/app/DTO/PostagemDTO/PostagemReadDTO';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-listar-postagem-seguidos',
  templateUrl: './listar-postagem-seguidos.component.html',
  styleUrls: ['./listar-postagem-seguidos.component.scss']
})
export class ListarPostagemSeguidosComponent {
  constructor(private client: HttpClient, private auth: AuthService, private route: Router){}

  usuario: UsuarioFindDTO | null = null

  postagens: PostagemReadDTO[] = []
  
  ngOnInit():void{
    
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)

    this.client.get<PostagemReadDTO[]>(`https://localhost:7088/api/postagem/listarPostagemSeguidos/${this.usuario?.id}`)
    .subscribe({
      next:(postagensReq) => {
        this.postagens = postagensReq
      },
      error:(erro) => {
        console.log(erro)
      }
    })
    
  }

  irParaPerfil(id: number): void{
    this.route.navigate([`perfil/${id}`])
  }

  getUserName(id: number): string{
    let usuarioEncontrado = this.usuario?.seguindo.find(u => u.id === id)

    if(usuarioEncontrado){
      return usuarioEncontrado.userName;
    }

    return '';
  }

}
