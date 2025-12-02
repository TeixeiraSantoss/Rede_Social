import { UsuarioCreateDTO } from './../../../DTO/UsuarioDTO/UsuarioCreateDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
  constructor(private client: HttpClient, private router: Router, private fb: FormBuilder, private location: Location){}

  form!: FormGroup

  isSubmitting: boolean = false

  //controlador de mensagens de sucesso
  mensagemSucesso: string | null = null

  //Variavel de controle de visibilidade da senha
  senhaVisivel: boolean = false

  //Inicializando variaveis
  ngOnInit(): void{
    this.form = this.fb.group({
      nome: ['', [Validators.required, this.naoSoEspacosValidator]],
      userName: ['', [Validators.required, this.naoSoEspacosValidator]],
      email: ['', [Validators.required, this.naoSoEspacosValidator]],
      senha: ['', [Validators.required, this.naoSoEspacosValidator]]
    })
  }

  //Validator personalizado para tratar espaços vazios
  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null

    if(v == null) return null

    return v.trim().length === 0 ? {apenasEspacos: true} : null
  }

  //Getters
  get nome(): AbstractControl | null {return this.form.get('nome')}
  get userName(): AbstractControl | null {return this.form.get('userName')}
  get email(): AbstractControl | null {return this.form.get('email')}
  get senha(): AbstractControl | null {return this.form.get('nome')}

  onSubmit(): void{

    //Caso o formulario ja tenha sido enviado 1 vez, ele evita de fazer o envio novamente
    if(this.isSubmitting) return

    //Caso o formulario não atenda aos requisitos dos Validators, ele marca todos os campos com
    // "Touched" dessa forma atendendo aos requisitos de erro da logica do formulario
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    //Constroi DTO
    //"form.value" acessa o valor dos campos definido como "FormControl" no template
    const formValue = this.form.value
    const novoUsuario: UsuarioCreateDTO = {
      nome: (formValue.nome as string).trim(),
      userName: (formValue.userName as string).trim(),
      email: (formValue.email as string).trim(),
      senha: (formValue.senha as string).trim()
    }

    //flag de envio
    this.isSubmitting = true

    this.client.post<UsuarioCreateDTO>("https://localhost:7088/api/usuario/cadastrar", novoUsuario)
    .subscribe({
      next: () =>{
        console.log("Usuario cadastrado com sucesso")

        this.mensagemSucesso = "Usuario cadastrado com sucesso"

        setTimeout(() => {
          this.mensagemSucesso = null
          this.form.reset()
          this.isSubmitting = false
          this.router.navigate(["login"])
        }, 3000)

      },
      error: (erro) =>{
        console.log(erro)
        this.isSubmitting = false
      }
    })

  }

  toggleSenha(): void{
    //Faz a troca de valor da variavel "senhaVisivel"
    this.senhaVisivel = !this.senhaVisivel
  }

  voltarPagina(): void{
    this.location.back()
  }
}
