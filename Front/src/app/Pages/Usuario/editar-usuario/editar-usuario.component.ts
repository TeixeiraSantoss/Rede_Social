import { UsuarioEditDTO } from './../../../DTO/UsuarioDTO/UsuarioEditDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  constructor(private client: HttpClient, private router: ActivatedRoute){}

  id: number = 0
  nome: string = ""
  userName: string = ""

  ngOnInit():void{

    this.router.params
    .subscribe({
      next: (parametros)=>{
        let {id} = parametros
        this.id = id
      },
      error: (erro)=>{
        console.log(erro)
      }
    })

    this.client.get<UsuarioReadDTO>(`https://localhost:7088/api/usuario/buscar/${this.id}`)
    .subscribe({
      next: (usuario)=>{
        this.nome = usuario.nome
        this.userName = usuario.userName
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  editar():void {

    let usuarioEditado: UsuarioEditDTO = {
      nome: this.nome,
      userName: this.userName
    }

    this.client.patch<UsuarioEditDTO>(`https://localhost:7088/api/usuario/editar/${this.id}`, usuarioEditado)
    .subscribe({
      next: ()=>{
        console.log("Usuario alterado com sucesso")
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }
}
