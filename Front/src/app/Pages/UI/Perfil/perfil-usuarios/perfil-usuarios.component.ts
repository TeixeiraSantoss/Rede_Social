import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrls: ['./perfil-usuarios.component.scss']
})
export class PerfilUsuariosComponent {
  constructor(private client: HttpClient, 
    private router: ActivatedRoute, 
    private route: Router,
    private auth: AuthService){}

  usuario: UsuarioReadDTO | null = null

  //Recuperando "Id" da URL para poder retornar os dados do usuario 
  ngOnInit(): void{
    this.router.params
    .subscribe({
      next:(parametros) =>{
        let {id} = parametros

        //Requisição para receber os dados do usuario
        this.client.get<UsuarioReadDTO>(`https://localhost:7088/api/usuario/buscar/${id}`)
        .subscribe({
          next:(usuarioResp) => {
            //Atribuido os dados recebidos da requisição para o meu objeto local
            this.usuario = usuarioResp

            console.log("Usuario carregado", this.usuario)
          },
          error:(erro) => {
            console.log(erro)
          }
        })
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }

  //Metodos do menu
  irParaEditarUsuario(): void{
    this.route.navigate([`usuario/editar/${this.usuario?.id}`])
  }

  teste(): void{
    this.route.navigate([""]) 
  }

  excluir():void{
    this.client.delete(`https://localhost:7088/api/usuario/excluir/${this.usuario?.id}`)
    .subscribe({
      next:() => {
        this.auth.logout()
        this.route.navigate([""])
        console.log("usuario deletado")
      }
    })
  }

  //Metodos das postagens
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
