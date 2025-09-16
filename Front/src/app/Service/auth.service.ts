import { Injectable } from '@angular/core';
import { UsuarioReadDTO } from '../DTO/UsuarioDTO/UsuarioReadDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Metodo Login
  //Vai armazenar no SessionStorage o objeto usuario que realizar o login na aplicação

  login(usuario: UsuarioReadDTO): void{
    if(usuario != null){
      sessionStorage.setItem('usuario', JSON.stringify(usuario))
    }
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
