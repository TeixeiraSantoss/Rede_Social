using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
using Back.DTO.PostagemDTO;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/postagem")]
    public class PostagemController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public PostagemController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        //
        //Inicio Cadastrar

        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] PostagemCreateDTO postagem)
        {
            try
            {

                PostagemModel novaPostagem = new PostagemModel
                {
                    titulo = postagem.titulo,
                    conteudo = postagem.conteudo,
                    UsuarioId = postagem.UsuarioId
                };

                _ctx.Postagens.Add(novaPostagem);
                _ctx.SaveChanges();

                return Ok("Ordem criada com sucesso " + novaPostagem);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Cadastrar
        //

        //
        //Inicio Listar

        [HttpGet("listar")]
        public IActionResult Listar()
        {
            try
            {
                List<PostagemModel> postagens = _ctx.Postagens.Include(p => p.Usuario).ToList();

                List<PostagemReadDTO> postagensEnv = postagens.Select(p => new PostagemReadDTO
                {
                    id = p.id,
                    titulo = p.titulo,
                    conteudo = p.conteudo,
                    UsuarioId = p.UsuarioId
                }).ToList();

                if (postagensEnv == null)
                {
                    return BadRequest("Nenhuma postagem encontrada");
                }

                return Ok(postagensEnv);

            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Listar
        //

        //
        //Inicio Editar

        [HttpPatch("editar/{id}")]
        public IActionResult Editar([FromBody] PostagemEditDTO postagem, [FromRoute] int id)
        {
            try
            {
                PostagemModel? postagemExistente = _ctx.Postagens.Find(id);

                if (postagemExistente == null)
                {
                    return BadRequest("Nenhuma postagem existente");
                }

                postagemExistente.titulo = postagem.titulo;
                postagemExistente.conteudo = postagem.conteudo;

                _ctx.Postagens.Update(postagemExistente);
                _ctx.SaveChanges();

                return Ok("Postagem Alterada com sucesso " + postagemExistente);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Editar
        //

        //
        //Inicio Excluir

        [HttpDelete("excluir/{id}")]
        public IActionResult Excluir([FromRoute] int id)
        {
            try
            {
                PostagemModel? postagemExistente = _ctx.Postagens.Find(id);

                if (postagemExistente == null)
                {
                    return BadRequest("Postagem não encontrada");
                }

                _ctx.Postagens.Remove(postagemExistente);
                _ctx.SaveChanges();

                return Ok("Postagem excluida com sucesso");
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Excluir
        //

        //
        //Inicio Buscar po id da postagem
        [HttpGet("buscar/{id}")]
        public IActionResult Buscar([FromRoute] int id)
        {
            try
            {
                PostagemModel? postagemExistente = _ctx.Postagens.Find(id);

                if (postagemExistente == null)
                {
                    return NotFound("Nenhuma postagem encontrada");
                }

                PostagemReadDTO? postagemEncontrada = new PostagemReadDTO
                {
                    id = postagemExistente.id,
                    titulo = postagemExistente.titulo,
                    conteudo = postagemExistente.conteudo,
                    UsuarioId = postagemExistente.UsuarioId

                };

                return Ok(postagemEncontrada);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Buscar
        //

        //
        //Buscar por id do usuario
        [HttpGet("buscarIdUser/{userId}")]
        public IActionResult BuscarIdUser([FromRoute] int userId)
        {
            try
            {
                List<PostagemModel>? postagemExistente = _ctx.Postagens.ToList();

                List<PostagemReadDTO>? postagensEnv = postagemExistente
                .Where(p => p.UsuarioId == userId)
                .Select(p => new PostagemReadDTO
                    {
                        id = p.id,
                        conteudo = p.conteudo,
                        titulo = p.titulo,
                        UsuarioId = p.UsuarioId
                    }).ToList();

                if (postagemExistente == null)
                {
                    return NotFound("Nenhuma postagem encontrada");
                }

                return Ok(postagensEnv);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Buscar
        //

    }
}