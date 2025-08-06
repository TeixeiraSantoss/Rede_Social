using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
using Back.DTO.SeguidorDTO;
using Back.DTO.UsuarioDTO;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public UsuarioController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        //
        //Inicio Cadastrar

        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] UsuarioCreateDTO usuario)
        {
            try
            {
                UsuarioModel? usuarioExistente = _ctx.Usuarios.FirstOrDefault(u => u.userName == usuario.userName);

                if (usuarioExistente != null)
                {
                    return BadRequest("Usuario já cadastrado " + usuarioExistente);
                }

                UsuarioModel novoUsuario = new UsuarioModel
                {
                    nome = usuario.nome,
                    userName = usuario.userName,
                    email = usuario.email,
                    senha = usuario.senha
                };

                _ctx.Usuarios.Add(novoUsuario);
                _ctx.SaveChanges();

                return Ok("Usuario cadastrado com sucesso " + novoUsuario);
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
                List<UsuarioModel> usuarios = _ctx.Usuarios.ToList();

                List<UsuarioReadDTO> usuariosEnv = usuarios.Select(u => new UsuarioReadDTO
                {
                    id = u.id,
                    nome = u.nome,
                    userName = u.userName,
                    Postagens = u.Postagens,
                    Seguindo = u.Seguindo,
                    Seguidores = u.Seguidores
                }).ToList();

                if (usuariosEnv == null)
                {
                    return BadRequest("Nenhum usuario encontrado");
                }

                return Ok(usuariosEnv);
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
        public IActionResult Editar([FromBody] UsuarioEditDTO usuario, [FromRoute] int id)
        {
            try
            {
                UsuarioModel? usuarioExstente = _ctx.Usuarios.Find(id);

                if (usuarioExstente == null)
                {
                    return BadRequest("Nenhum usuario encontrado");
                }

                usuarioExstente.nome = usuario.nome;
                usuarioExstente.userName = usuario.userName;

                _ctx.Usuarios.Update(usuarioExstente);
                _ctx.SaveChanges();

                return Ok("Informações editadas com sucesso");
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
                UsuarioModel? usuarioExistente = _ctx.Usuarios.Find(id);

                if (usuarioExistente == null)
                {
                    return BadRequest("Nenhumusuario encontrado");
                }

                _ctx.Usuarios.Remove(usuarioExistente);
                _ctx.SaveChanges();

                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Excluir
        //

        //
        //Inicio Listar quem está sendo Seguido

        [HttpGet("listarSeguidos")]
        public IActionResult ListarSeguidos([FromRoute] int id)
        {
            try
            {
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Listar quem está sendo Seguido
        //

        //
        //Inicio Listar quem está Seguindo

        [HttpGet("listarSeguindo")]
        public IActionResult ListarSeguindo()
        {
            try
            {
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Listar quem está Seguindo
        //
    }
}