import { PostagemReadDTO } from './../../../DTO/PostagemDTO/PostagemReadDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent {
  constructor(private client: HttpClient, private route: Router, private auth: AuthService){}

  postagens: PostagemReadDTO[] = []
  usuario: UsuarioFindDTO | null = null

  ngOnInit(): void{
    this.usuario = this.auth.getUsuario()

    this.client.get<PostagemReadDTO[]>(`https://localhost:7088/api/postagem/buscarIdUser/${this.usuario?.id}`)
    .subscribe({
      next:(postagens) => {
        this.postagens = postagens
        console.table(this.postagens)
      },
      error:(erro) => {
        console.log(erro)
      }
    })
  }

  Editar(id: number): void{
    console.log(id)
    this.route.navigate([`postagem/editar/${id}`])
  }

  Excluir(id: number): void{
    this.client.delete(`https://localhost:7088/api/postagem/excluir/${id}`)
    .subscribe({
      next:() =>{
        console.log("postagem excluida")
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }
}
