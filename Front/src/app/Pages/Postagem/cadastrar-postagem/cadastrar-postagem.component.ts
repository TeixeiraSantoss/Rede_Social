import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostagemCreatDTO } from 'src/app/DTO/PostagemDTO/PostagemCreateDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.scss']
})
export class CadastrarPostagemComponent {
  constructor(private client: HttpClient, private auth: AuthService, private router: Router){}

  titulo: string = ""
  conteudo: string = ""
  UsuarioId: number = 0

  //variaveis para controle das menssagens de alerta
  msg: string = ""
  mostrarMsg: boolean = false

  teste(): void{
    console.log(this.titulo)
    console.log(this.conteudo)
    console.log(this.UsuarioId)
  }

  cadastrar(): void{

    let dadosUsuario = this.auth.getUsuario()

    if(dadosUsuario?.id != undefined){
      
      let novaPostagem: PostagemCreatDTO = {
        titulo: this.titulo,
        conteudo: this.conteudo,
        UsuarioId: dadosUsuario?.id
      }

      this.client.post<PostagemCreatDTO>("https://localhost:7088/api/postagem/cadastrar", novaPostagem)
      .subscribe({
        next: () =>{
          console.log("Postagem cadastrada com sucesso")

          this.msg = "Postagem cadastrada com sucesso"

          this.exibirMsg()

          setTimeout(() => {
            this.esconderMsg()
            this.router.navigate(["/feed"]); 
          }, 3000)
        },
        error: (erro) =>{
          console.log(erro)

          this.msg = "Erro ao cadastrar postagem"

          this.exibirMsg()

          setTimeout(() => {
            this.esconderMsg()
          }, 3000)
        }
      })
      
    }  

  } 
  
  //Metodos para exibir menssagem
  exibirMsg(): void{
    this.mostrarMsg = true
  }

  esconderMsg(): void{
    this.mostrarMsg = false
  }

}
