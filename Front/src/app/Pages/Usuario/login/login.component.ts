import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLoginDTO } from 'src/app/DTO/UsuarioDTO/UsuarioLoginDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private client: HttpClient, private auth: AuthService, private router: Router, private fb: FormBuilder){}

  form!: FormGroup

  //controlador de mensagens de sucesso
  mensagemSucesso: string | null = null

  //recebe mensagens de erro
  serverErros: string[] = []

  //condicional para o indicador de loading
  isLoading: boolean = false

  //Variavel de controle de visibilidade da senha
  senhaVisivel: boolean = false

  id: number = 0

  //Inicializa FormGroup e FormControl
  ngOnInit(): void{
    this.form = this.fb.group({
      email: ['', [Validators.required, this.naoSoEspacosVazios]],
      senha: ['', [Validators.required, this.naoSoEspacosVazios]]
    })
  }

  //Trata caso algum campo so contenha espaços vazios
  naoSoEspacosVazios(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if (v == null) return null
    return v.trim().length === 0 ? {apenasEspacos: true} : null
  }

  //getters
  get email(): AbstractControl | null {return this.form.get('email')}
  get senha(): AbstractControl | null {return this.form.get('senha')}

  onSubmit(): void{

    if (this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    //constroi objeto para requisição
    const formValue = this.form.value
    const loginInfo: UsuarioLoginDTO = {
      id: this.id,
      email: (formValue.email as string).trim(),
      senha: (formValue.senha as string).trim()
    }

    this.client.post<UsuarioLoginDTO>("https://localhost:7088/api/usuario/login", loginInfo)
    .subscribe({
      next:(dados) =>{
        //Dados ja foram enviados para o BackEnd e fluxo de dados já está ocorrendo
        //"isLoading = true" pois aqui é o inicio da minha logica de login
        this.isLoading = true        

        //Enviando os dados do usuario para serem salvos no sessionStorage
        //Execultando uma função callback para fazer a navegação
        this.auth.login(dados, () =>{
          //Fim do loading
          this.mensagemSucesso = "Login realizado com sucesso"

          setTimeout(() => {
            this.mensagemSucesso = null
          
            this.isLoading = false
            this.form.reset()
            this.router.navigate(["feed"])
          }, 3000)
        });     

      },
      error:(erro) =>{
        console.log(erro)
        //Fim do loading
        this.isLoading = false

        this.serverErros = ["Email ou Senha incorretos"]

      }
    })

    this.serverErros = []

  }

  irParaCadastrarUsuario(): void{
    this.router.navigate(["usuario/cadastrar"])
  }

  toggleSenha(): void{
    //Faz a troca de valor da variavel "senhaVisivel"
    this.senhaVisivel = !this.senhaVisivel
  }
}
