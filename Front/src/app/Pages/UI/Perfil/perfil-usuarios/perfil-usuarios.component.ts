import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguidorCreatDTO } from 'src/app/DTO/SeguidorDTO/SeguidorCreatDTO';
import { UsuarioSeguidoDTO } from 'src/app/DTO/SeguidorDTO/UsuarioSeguidoDTO';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrls: ['./perfil-usuarios.component.scss']
})
export class PerfilUsuariosComponent {
  constructor(private client: HttpClient,
    private auth: AuthService,
    private router: ActivatedRoute, 
    private route: Router){}

  usuarioLogado: UsuarioFindDTO | null = this.auth.getUsuario()

  usuario: UsuarioReadDTO | null = null

  //variavel para controlar se o usuarioLogado segue ou não o usuario
  seguindo: boolean = false

  id: number = 0

  //Recuperando "Id" da URL para poder retornar os dados do usuario 
  ngOnInit(): void{
    console.log(this.usuarioLogado)
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

            //verifica se o usuario é seguido ou não
            this.seguindo = this.verificarSeguidor()
            console.log(this.seguindo)

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

  //verifica se o usuario está sendo seguido pelo "usuarioLogado"
  verificarSeguidor():boolean{
    if (!this.usuarioLogado) return false;

    // verifica se o usuarioLogado segue o usuario atual (id)
    return this.usuarioLogado.seguindo.some(s => s.id == this.usuario?.id);
  }

  seguirUsuario():void{
    //verifica se existe algum usuario logado na aplicação
    //isso deve ser feito porque o objeto "usuarioLogado" tem a possibilidade de ser "null"
    if(!this.usuarioLogado){
      console.log("nenhum usuario logado na aplicação")
      return;
    }

    const seguirInfos: SeguidorCreatDTO = {
      seguidoId: this.id,
      seguidorId: this.usuarioLogado.id
    }

    this.client.post<SeguidorCreatDTO>("https://localhost:7088/api/seguidor/seguirUsuario", seguirInfos)
    .subscribe({
      next:() => {
        console.log("Usuario seguido com sucesso")

        //Faz uma chamada para atualizar a lista de "seguidos"
        this.client.get<UsuarioSeguidoDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidos/${this.usuarioLogado?.id}`)
        .subscribe({
          next:(listaSeguidos) => {
            if(this.usuarioLogado){
              this.usuarioLogado.seguindo = listaSeguidos

              this.auth.setListaSeguindo(this.usuarioLogado)
            }     

            this.seguindo = this.verificarSeguidor()
            console.log("Status seguindo: ", this.seguindo)
            
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

  deixarSeguir():void{
    if(!this.usuarioLogado){
      console.log("nenhum usuario logado na aplicação")
      return;
    }

    const seguirInfos: SeguidorCreatDTO = {
      seguidoId: this.id,
      seguidorId: this.usuarioLogado.id
    }

    this.client.delete<SeguidorCreatDTO>("https://localhost:7088/api/seguidor/DeixarSeguir", {body: seguirInfos})
    .subscribe({
      next:() => {
        console.log("Usuario deixado de seguir")

        //Faz uma chamada para atualizar a lista de "seguidos"
        this.client.get<UsuarioSeguidoDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidos/${this.usuarioLogado?.id}`)
        .subscribe({
          next:(listaSeguidos) => {
            if(this.usuarioLogado){
              this.usuarioLogado.seguindo = listaSeguidos

              this.auth.setListaSeguindo(this.usuarioLogado)
            }
              
            this.seguindo = this.verificarSeguidor()
            console.log("Status seguindo: ", this.seguindo)

          },
          error:(erro) => {
            console.log(erro)
          }
        })        
      },
      error:(erro) => {
        console.log(erro)
      }
    })

  }

  voltarPagina(): void{
    this.route.navigate(["feed"])
  }

}
