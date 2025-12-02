using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
using Back.DTO.PostagemDTO;
using Back.DTO.SeguidorDTO;
using Back.DTO.UsuarioDTO;
using Back.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        //Hashear a senha
        private readonly PasswordHasher<UsuarioModel> _passwordHasher = new PasswordHasher<UsuarioModel>();
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
                    email = usuario.email
                };

                //Hasheando a senha
                novoUsuario.senha = _passwordHasher.HashPassword(novoUsuario, usuario.senha);

                _ctx.Usuarios.Add(novoUsuario);
                _ctx.SaveChanges();

                return Ok(novoUsuario);
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
        //Inicio Buscar
        [HttpGet("buscar/{id}")]
        public IActionResult Buscar([FromRoute] int id)
        {
            try
            {
                UsuarioModel? usuarioExistente = _ctx.Usuarios.Find(id);

                //Lista de seguidores
                List<UsuarioSeguidorDTO> seguidores = _ctx.Seguidores
                .Where(s => s.seguidoId == id)
                .Include(s => s.Seguidor)
                .Select(s => new UsuarioSeguidorDTO
                {
                    id = s.Seguidor.id,
                    nome = s.Seguidor.nome,
                    userName = s.Seguidor.userName
                })
                .ToList();

                //Lista de seguidos
                List<UsuarioSeguidoDTO> seguidos = _ctx.Seguidores
                    .Where(s => s.seguidorId == id)
                    .Include(s => s.Seguido)
                    .Select(s => new UsuarioSeguidoDTO
                    {
                        id = s.Seguido.id,
                        nome = s.Seguido.nome,
                        userName = s.Seguido.userName
                    })
                    .ToList();

                //Lista de postagens
                List<PostagemReadDTO>? postagens = _ctx.Postagens
                .Where(p => p.UsuarioId == id)
                .Select(p => new PostagemReadDTO
                {
                    id = p.id,
                    titulo = p.titulo,
                    conteudo = p.conteudo,
                    UsuarioId = p.UsuarioId
                })
                .ToList();

                if (usuarioExistente == null)
                {
                    return NotFound("Nenhum usuario encontrado");
                }

                UsuarioFindDTO? usuarioEncontrado = new UsuarioFindDTO
                {
                    id = usuarioExistente.id,
                    nome = usuarioExistente.nome,
                    userName = usuarioExistente.userName,
                    email = usuarioExistente.email,
                    senha = usuarioExistente.senha,
                    Postagens = postagens,
                    Seguidores = seguidores,
                    Seguindo = seguidos
                };

                return Ok(usuarioEncontrado);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Buscar
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

                //Retornando um objeto JSON manualmente para evitar erro de JSON.parse quando o objeto for recebido no Front
                return Ok(usuarioExstente);
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
        //Inicio Login
        [HttpPost("login")]
        public IActionResult Login([FromBody] UsuarioLoginDTO loginInfo)
        {
            try
            {
                UsuarioModel? usuarioExistente = _ctx.Usuarios.FirstOrDefault(u => u.email == loginInfo.email);

                UsuarioLoginDTO? dadosUsusario = new UsuarioLoginDTO
                {
                    id = usuarioExistente.id,
                    email = usuarioExistente.email,
                    senha = usuarioExistente.senha
                };

                if (dadosUsusario == null)
                {
                    return NotFound("Nenhum usurio encontrado");
                }

                //verifica se a senha vinda do Front é compativel com a senha do usuario
                var resultado = _passwordHasher.VerifyHashedPassword(usuarioExistente, dadosUsusario.senha, loginInfo.senha);

                if (resultado == PasswordVerificationResult.Success)
                {
                    return Ok(dadosUsusario);
                }

                return Unauthorized("dados de login incorretos");
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Login
        //

    }
}