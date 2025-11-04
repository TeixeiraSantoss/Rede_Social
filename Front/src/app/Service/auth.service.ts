import { UsuarioReadDTO } from './../DTO/UsuarioDTO/UsuarioReadDTO';
import { Injectable } from '@angular/core';
import { UsuarioLoginDTO } from '../DTO/UsuarioDTO/UsuarioLoginDTO';
import { HttpClient } from '@angular/common/http';
import { PostagemReadDTO } from '../DTO/PostagemDTO/PostagemReadDTO';
import { UsuarioSeguidorDTO } from '../DTO/SeguidorDTO/UsuarioSeguidorDTO';
import { UsuarioSeguidoDTO } from '../DTO/SeguidorDTO/UsuarioSeguidoDTO';
import { SeguidorModel } from '../Models/SeguidorModel';
import { PostagemModel } from '../Models/PostagemModel';
import { UsuarioEditDTO } from '../DTO/UsuarioDTO/UsuarioEditDTO';
import { UsuarioFindDTO } from '../DTO/UsuarioDTO/UsuarioFindDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) { }

  //Metodo Login
  //Vai armazenar no SessionStorage o objeto usuario que realizar o login na aplicação

  login(usuario: UsuarioLoginDTO, onSucess:() => void): void{

    let usuarioSalvar: UsuarioFindDTO

    this.client.get<UsuarioFindDTO>(`https://localhost:7088/api/usuario/buscar/${usuario.id}`)
    .subscribe({
      next:(dadosUsuario) => {

        usuarioSalvar = {
          id: dadosUsuario.id,
          nome: dadosUsuario.nome,
          userName: dadosUsuario.userName,
          email: dadosUsuario.email,
          senha: dadosUsuario.senha,
          seguidores: dadosUsuario.seguidores,
          seguindo: dadosUsuario.seguindo,
          postagens: dadosUsuario.postagens
        }

        sessionStorage.setItem('usuario', JSON.stringify(usuarioSalvar))

        //"onSucess" é uma função callback que nesse contexto está sendo usada
        //para fazer a navegação para o "feed" apenas quando os dados do usuario
        //estiverem salvos no sessioStorage
        onSucess()
      },
      error:(erro) => {
        console.log(erro)
      }
    })
  }

  //Metodo GetUsuario
  //Esse metodo vai recuperar o objeto que está armazenado no SessionStorage e converter ele para o tipo UsuarioFindDTO
  getUsuario(): UsuarioFindDTO | null{
    //Recupera os dados do sessionStorage
    let dados = sessionStorage.getItem('usuario')

    //Verifica se dados é null, e converte para a DTO
    if(dados != null){
      return JSON.parse(dados) as UsuarioFindDTO;
    }else{
      return null;
    }
  }

  setListaSeguindo(usuarioEditado: UsuarioFindDTO){
    let usuarioLogado = this.getUsuario()

    if(!usuarioLogado){
      return
    }

    if(usuarioLogado.seguindo.length != usuarioEditado.seguindo.length){
      usuarioLogado.seguindo = usuarioEditado.seguindo
    }
    sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado))
  }

  //Metodo setUsuario
  //Vai alterar os dados do usuario caso haja alguma alteração
  setUsuarioEditado(usuarioEditado: UsuarioEditDTO){
    let usuarioLogado = this.getUsuario()

    if(!usuarioLogado){
      console.log("Nenhum usuario está logado no momento")
      return
    }

    if((usuarioLogado?.nome != usuarioEditado.nome) || (usuarioLogado.userName != usuarioEditado.userName)){
      usuarioLogado.nome = usuarioEditado.nome
      usuarioLogado.userName = usuarioEditado.userName

      console.log(usuarioLogado)

      sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado))
    }
  }

  //Metodo isLogado
  //Verifica se existe um usuario logado ou não
  isLogado(): boolean{
    return !!this.getUsuario();
  }

  //Metodo Logout
  //Vai limpar os dados armazenados no SessionStorage
  logout(): void{
    sessionStorage.removeItem('usuario')
  }
}
