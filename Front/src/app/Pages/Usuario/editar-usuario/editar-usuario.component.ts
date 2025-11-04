import { UsuarioEditDTO } from './../../../DTO/UsuarioDTO/UsuarioEditDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  constructor(private client: HttpClient, private router: ActivatedRoute, private route: Router, private auth: AuthService){}

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

    this.client.get<UsuarioFindDTO>(`https://localhost:7088/api/usuario/buscar/${this.id}`)
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
    console.log("entrou no editar")
    let usuarioEditado: UsuarioEditDTO = {
      nome: this.nome,
      userName: this.userName
    }
    console.log(this.id)

    this.client.patch<UsuarioEditDTO>(`https://localhost:7088/api/usuario/editar/${this.id}`, usuarioEditado)
    .subscribe({
      next: ()=>{
        console.log("entrou no next")
        this.auth.setUsuarioEditado(usuarioEditado)
        
        console.log("Usuario alterado com sucesso", this.auth.getUsuario())

        this.route.navigate(["/perfil"])
      },
      error: (erro)=>{
        console.log(erro)
      }
    })    
    
  }
}
