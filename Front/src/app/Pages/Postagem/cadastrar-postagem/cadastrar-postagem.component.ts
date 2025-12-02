import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostagemCreatDTO } from 'src/app/DTO/PostagemDTO/PostagemCreateDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.scss']
})
export class CadastrarPostagemComponent {
  constructor(private client: HttpClient, private auth: AuthService, private router: Router, private fb: FormBuilder){}

  //Representa o formulario inteiro
  form!: FormGroup

  //controlador de mensagens de sucesso
  mensagemSucesso: string | null = null

  //flag para bloquear UI durante submissão
  isSubmitting = false

  //array para receber menssagens de erro do servidor
  //o array deve sempre conter apenas 1 menssagem de erro para evitar erro de logica no template
  serverErrors: string[] = []

  UsuarioId: number = 0

  ngOnInit(): void{
    //Cria o FormGroup já com os FormControls e Validators
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      conteudo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]] 
    })
  }

  //Validator customizado
  //bloqueia valores que sejam so espaços
  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if(v == null) return null
    return v.trim().length === 0 ? {apenasEspacos: true} : null
  }

  //Getters
  get titulo(): AbstractControl | null {return this.form.get('titulo')}
  get conteudo(): AbstractControl | null {return this.form.get('conteudo')}

  //Metodo onSubmit
  //vai ser chamado ao submeter o fomulario
  onSubmit(): void{
    //Caso o formulario ja tenha sido enviado 1 vez, evita que seja enviado novamente
    if (this.isSubmitting) return

    //Validação do formulario
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    //verifica se usuario esta logado
    let dadosUsuario = this.auth.getUsuario()

    if(!dadosUsuario){
      this.serverErrors = ['Não tem nenhum usuario logado']
      return
    }

    //Contruindo DTO
    const formValue = this.form.value
    const novaPostagem: PostagemCreatDTO ={
      titulo: (formValue.titulo as string).trim(),
      conteudo: (formValue.conteudo as string).trim(),
      UsuarioId: dadosUsuario.id
    }

    //limpa menssagens de erro anteriores e seta flag de envio
    this.serverErrors = []
    this.isSubmitting = true

    //Requisição HTTP para cadastrar postagem
    this.client.post<PostagemCreatDTO>("https://localhost:7088/api/postagem/cadastrar", novaPostagem)
      .subscribe({
        next: () =>{
          console.log("Postagem cadastrada com sucesso")

          this.mensagemSucesso = "Publicação cadastrada com sucesso"

          setTimeout(() => {
            this.mensagemSucesso = null
            //Limpa Formulario
            this.form.reset()
            this.isSubmitting = false

            //redireciona para o feed
            this.router.navigate(["/feed"]);
          }, 3000)

          
        },
        error: (erro) =>{
          console.log(erro)

          this.isSubmitting = false
        }
      })

  }

}
