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
    private route: Router){}

  usuario: UsuarioReadDTO | null = null

  id: number = 0

  //Recuperando "Id" da URL para poder retornar os dados do usuario 
  ngOnInit(): void{
    this.router.params
    .subscribe({
      next:(parametros) =>{
        let {id} = parametros

        this.id = id

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

  irParaListaSeguidos(id: number):void{
    this.route.navigate([`seguidores/listarSeguidos/${id}`])
  }

  irParaListaSeguidores(id: number):void{
    this.route.navigate([`seguidores/listarSeguidores/${id}`])
  }

}
