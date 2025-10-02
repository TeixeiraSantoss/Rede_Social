import { UsuarioReadDTO } from './../DTO/UsuarioDTO/UsuarioReadDTO';
import { Injectable } from '@angular/core';
import { UsuarioLoginDTO } from '../DTO/UsuarioDTO/UsuarioLoginDTO';
import { HttpClient } from '@angular/common/http';
import { PostagemReadDTO } from '../DTO/PostagemDTO/PostagemReadDTO';
import { UsuarioSeguidorDTO } from '../DTO/SeguidorDTO/UsuarioSeguidorDTO';
import { UsuarioSeguidoDTO } from '../DTO/SeguidorDTO/UsuarioSeguidoDTO';
import { SeguidorModel } from '../Models/SeguidorModel';
import { PostagemModel } from '../Models/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) { }

  //Metodo Login
  //Vai armazenar no SessionStorage o objeto usuario que realizar o login na aplicação

  login(usuario: UsuarioLoginDTO, onSucess:() => void): void{

    let usuarioSalvar: UsuarioReadDTO

    this.client.get<UsuarioReadDTO>(`https://localhost:7088/api/usuario/buscar/${usuario.id}`)
    .subscribe({
      next:(dadosUsuario) => {

        usuarioSalvar = {
          id: dadosUsuario.id,
          nome: dadosUsuario.nome,
          userName: dadosUsuario.userName,
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
  //Esse metodo vai recuperar o objeto que está armazenado no SessionStorage e converter ele para o tipo UsuarioReadDTO
  getUsuario(): UsuarioReadDTO | null{
    //Recupera os dados do sessionStorage
    let dados = sessionStorage.getItem('usuario')

    //Verifica se dados é null, e converte para a DTO
    if(dados != null){
      return JSON.parse(dados) as UsuarioReadDTO;
    }else{
      return null;
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
