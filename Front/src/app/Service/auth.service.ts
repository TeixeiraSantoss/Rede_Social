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

  login(usuario: UsuarioLoginDTO): void{

    let usuarioSalvar: UsuarioReadDTO

    sessionStorage.setItem('usuario', JSON.stringify(usuario))

    this.client.get<UsuarioReadDTO>(`https://localhost:7088/api/usuario/buscar/${usuario.id}`)
    .subscribe({
      next:(dadosUsuario) => {

        //usuarioCarregado contem os dados de Seguidores, Seguidos e Postagens do usuario que realizou o login
        let usuarioCarregado = this.carregarDados(usuario.id);

        //o if é necessario pois o usuarioCarregado possui o tipo NULL
        if(usuarioCarregado){  
          usuarioSalvar = {
            id: dadosUsuario.id,
            nome: dadosUsuario.nome,
            userName: dadosUsuario.userName,
            Seguidores: usuarioCarregado.Seguidores,
            Seguindo: usuarioCarregado.Seguindo,
            Postagens: usuarioCarregado.Postagens
          }
        }

        sessionStorage.removeItem('usuario')
        sessionStorage.setItem('usuario', JSON.stringify(usuarioSalvar))

        console.log("Dados do usuario Logado: ", usuarioSalvar)
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

  //Metodo carregarDados
  //Esse metodo vai carregar os dados do usuario que fez login
  //vai ser carregado:
  //Seguidores
  //Seguidos
  //Postagens
  carregarDados(userId: number): UsuarioReadDTO | null{
    //Caregar lista de postagens
    let postagens: PostagemModel[] = []

    this.client.get<PostagemReadDTO[]>(`https://localhost:7088/api/postagem/buscarIdUser/${userId}`)
    .subscribe({
      next:(postagensApi) => {

        postagens = postagensApi.map(p => ({
          id: p.id,
          conteudo: p.conteudo,
          titulo: p.titulo,
          UsuarioId: p.usuarioId
        }))

      },
      error:(erro) => {
        console.log(erro)
      }
    })

    //Carregar lista de Seguidores e Seguidos
    let seguidores: SeguidorModel[] = []
    let seguidos: SeguidorModel[] = []

    this.client.get<UsuarioSeguidorDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidores/${userId}`)
    .subscribe({
      next:(rSeguidores) => {
        seguidores = rSeguidores.map(s => ({
          seguidoId: userId,
          seguidorId: s.id
        }))
      },
      error:(erro) => {
        console.log(erro)
      }
    })
    
    this.client.get<UsuarioSeguidoDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidos/${userId}`)
    .subscribe({
      next:(rSeguidos) => {
        seguidos = rSeguidos.map(s => ({
          seguidoId: s.id,
          seguidorId: userId
        }))
      },
      error:(erro) => {
        console.log(erro)
      }
    })

    console.log("Seguidores ", seguidores)
    console.log("seguidos", seguidos)
    console.log("Postagens", postagens)

    let usuarioLogado = this.getUsuario();

    if(usuarioLogado != null){
      console.log("entrou no if")
      usuarioLogado.Seguidores = seguidores
      usuarioLogado.Seguindo = seguidos
      usuarioLogado.Postagens = postagens
    }    

    console.log("usuario logado: ", usuarioLogado)

    return usuarioLogado;
  }
}
