import { SeguidorCreatDTO } from './../../../DTO/SeguidorDTO/SeguidorCreatDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent {
  constructor(private client: HttpClient, private route: Router){}

  usuarios: UsuarioReadDTO[] = []

  ngOnInit():void {
    this.client.get<UsuarioReadDTO[]>("https://localhost:7088/api/usuario/listar")
    .subscribe({
      next: (usuarios)=>{
        this.usuarios = usuarios;
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  editar(id: number):void {
    this.route.navigate([`usuario/editar/${id}`])
  }

  listaSeguidores(id: number): void{
    this.route.navigate([`seguidores/listarSeguidores/${id}`])
  }

  seguirUsuario(seguidoId: number):void{
    
    //alterar pelo id do usuario que esta logado na session
    let seguidorId: number = 1

    let seguirInfos: SeguidorCreatDTO = {
      seguidoId: seguidoId,
      seguidorId: seguidorId
    } 

    this.client.post<SeguidorCreatDTO>("https://localhost:7088/api/seguidor/seguirUsuario", seguirInfos)
    .subscribe({
      next:() => {
        console.log("Usuario: " + seguirInfos.seguidoId + " foi seguido pelo Usuario: " + seguirInfos.seguidorId)
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }

  deixarSeguir(seguidoId: number):void{

    //alterar pelo id do usuario que esta logado na session
    let seguidorId: number = 1

    let seguirInfos: SeguidorCreatDTO = {
      seguidoId: seguidoId,
      seguidorId: seguidorId
    }

    //O "delete" não aceita diretamente um objeto no body da requisição
    //por isso é necessario apontar manualmente que tem um objeto sendo enviado pelo body
    this.client.delete<SeguidorCreatDTO>("https://localhost:7088/api/seguidor/DeixarSeguir", {body: seguirInfos})
    .subscribe({
      next:() =>{
        console.log("Usuario: " + seguirInfos.seguidorId + " deixou de seguir Usuario: " + seguirInfos.seguidoId)
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }
}
