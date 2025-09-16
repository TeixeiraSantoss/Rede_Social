import { UsuarioReadDTO } from './../DTO/UsuarioDTO/UsuarioReadDTO';
import { Injectable } from '@angular/core';
import { UsuarioLoginDTO } from '../DTO/UsuarioDTO/UsuarioLoginDTO';
import { HttpClient } from '@angular/common/http';
import { PostagemReadDTO } from '../DTO/PostagemDTO/PostagemReadDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) { }

  //Metodo Login
  //Vai armazenar no SessionStorage o objeto usuario que realizar o login na aplicação

  login(usuario: UsuarioLoginDTO): void{

    let usuarioSalvar: UsuarioReadDTO

    this.client.get<UsuarioReadDTO>(`https://localhost:7088/api/usuario/buscar/${usuario.id}`)
    .subscribe({
      next:(dadosUsuario) => {
        usuarioSalvar = {
          id: dadosUsuario.id,
          nome: dadosUsuario.nome,
          userName: dadosUsuario.userName,
          Seguidores: dadosUsuario.Seguidores,
          Seguindo: dadosUsuario.Seguindo,
          Postagens: dadosUsuario.Postagens
        }
      },
      error:(erro) => {
        console.log(erro)
      }
    })

    if(usuario != null){
      sessionStorage.setItem('usuario', JSON.stringify(usuario))
    }

    this.carregarDados(usuario.id)
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

  //Metodo carregarDados
  //Esse metodo vai carregar os dados do usuario que fez login
  //vai ser carregado:
  //Seguidores
  //Seguidos
  //Postagens
  carregarDados(id: number): void{
    //Caregar lista de postagens
    let postagens: PostagemReadDTO[] = []
    

    this.client.get<PostagemReadDTO[]>("https://localhost:7088/api/postagem/listar")
    .subscribe({
      next:(postagensApi) => {
        postagens = postagensApi.filter(p => p.usuarioId == id)
      },
      error:(erro) => {
        console.log(erro)
      }
    })

  }
}
