import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostagemEditDTO } from 'src/app/DTO/PostagemDTO/PostagemEditDTO';
import { PostagemReadDTO } from 'src/app/DTO/PostagemDTO/PostagemReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.component.html',
  styleUrls: ['./editar-postagem.component.scss']
})
export class EditarPostagemComponent {
  constructor(private client: HttpClient, 
    private router: ActivatedRoute, 
    private route: Router, 
    private location: Location, 
    private fb: FormBuilder,
    private auth: AuthService){}
  
  //Criar formGroup
  form!: FormGroup

  //controlador da mensagem de sucesso
  mensagemSucesso: string | null = null

  //flag de envio
  isSubmitting = false

  //array que carrega mensagens de erro
  serverErrors: string[] = [] 

  //Receber o id da postagem ao clicar nela
  id: number = 0
  usuarioId: number = 0
  postagem: PostagemReadDTO | null = null

  ngOnInit(): void{

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      conteudo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]]
    })

    //Recebe o id da URL
    this.router.params.subscribe({
      next:(parametros) => {
        let {id} = parametros

        //Carregando os dados da Postagem antes dela ser editada
        this.client.get<PostagemReadDTO>(`https://localhost:7088/api/postagem/buscar/${id}`)
        .subscribe({
          next:(postagem) => {
            this.id = postagem.id
            this.usuarioId = postagem.usuarioId

            this.postagem = postagem
            
            this.preencherFormulario()
          },
          error:(erro) => {
            console.log(erro)
          }
        })
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }

  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null

    if(v == null) return null

    return v.trim().length === 0 ? {apenasEspacos: true} : null
  }

  //getters
  get titulo(): AbstractControl | null { return this.form.get('titulo') }
  get conteudo(): AbstractControl | null { return this.form.get('conteudo') }

  public onSubmit(): void{

    //Verifica se o formulario ja foi enviado 1 vez
    if(this.isSubmitting) return

    //Valida os campos do formulario
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    //verifica se o usuario esta logado
    let dadosUsuario = this.auth.getUsuario()

    if(!dadosUsuario){
      this.serverErrors = ["Nenhum usuario está logado, impossivel realizar esta ação"]
      return
    }

    //construindo DTO
    const formValue = this.form.value
    const postagemEditada: PostagemEditDTO = {
      titulo: (formValue.titulo as string).trim(),
      conteudo: (formValue.conteudo as string).trim()
    }

    //Limpa mensagens de erro e seta flag de envio
    this.serverErrors = []
    this.isSubmitting = true

    //requisição HTTP
    this.client.patch<PostagemEditDTO>(`https://localhost:7088/api/postagem/editar/${this.id}`, postagemEditada)
    .subscribe({
      next: () => {
        console.log("Postagem alterada com sucesso")

        this.mensagemSucesso = "Postagem editada com sucesso"

        setTimeout(() => {
          this.mensagemSucesso = null
          
          //limpa o formulario
          this.form.reset()
          this.isSubmitting = false

          this.route.navigate(["perfil"])
        }, 3000)
      },
      error: (erro) => {
        console.log(erro)

        this.isSubmitting = false
      }
    })
  }

  voltarPagina(){
    this.location.back()
  }

  preencherFormulario(){
    //Como estou usando FormGroup para manipular meu fomulario
    //é preciso utilizar das funções oferecidas pelo Angular para manipular esses dados
    //no caso de atribuir um valor a algum campo manualmente, é possivel uilizar o "patchValue" para
    //definir valores a alguns campos especificos
    this.form.patchValue({
      titulo: this.postagem?.titulo,
      conteudo: this.postagem?.conteudo
    })
  }
}
