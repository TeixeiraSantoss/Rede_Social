using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
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
                UsuarioModel? usuarioExistente = _ctx.Usuarios.FirstOrDefault(u => u.id == usuario.id);

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
                return Ok(usuarios);
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
        public IActionResult Editar([FromBody] UsuarioModel usuario, [FromRoute] int id)
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

        //Fim Editar
        //

        //
        //Inicio Excluir

        [HttpDelete("excluir/{id}")]
        public IActionResult Excluir([FromRoute] int id)
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

        //Fim Excluir
        //

        //
        //Inicio Listar quem está sendo Seguido

        [HttpGet("listarSeguidos")]
        public IActionResult ListarSeguidos()
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