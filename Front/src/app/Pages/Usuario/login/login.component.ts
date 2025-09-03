import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioLoginDTO } from 'src/app/DTO/UsuarioDTO/UsuarioLoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private client: HttpClient){}

  email: string = ""
  senha: string = ""

  login(): void{
    let loginInfo: UsuarioLoginDTO = {
      email: this.email,
      senha: this.senha
    }

    this.client.post<UsuarioLoginDTO>("https://localhost:7088/api/usuario/login", loginInfo)
    .subscribe({
      next:() =>{
        console.log("Login realizado com sucesso")
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }
}
