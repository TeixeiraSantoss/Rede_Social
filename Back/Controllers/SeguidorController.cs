using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
using Microsoft.AspNetCore.Mvc;
using Back.DTO.SeguidorDTO;
using Microsoft.EntityFrameworkCore;
using Back.Models;

namespace Back.Controllers
{
    [ApiController]
    [Route("api/seguidor")]
    public class SeguidorController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public SeguidorController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        //
        //Inicio Listar Seguidores

        [HttpGet("listar")]
        public IActionResult Listar()
        {
            try
            {
                List<SeguidorModel> seguidores = _ctx.Seguidores.Include(s => s.Seguido).Include(s => s.Seguidor).ToList();

                List<SeguidorReadDTO> seguidoresEnv = seguidores.Select(s => new SeguidorReadDTO
                {
                    seguidoId = s.seguidoId,
                    nomeSeguido = s.Seguido.nome,
                    userNameSeguido = s.Seguido.userName,
                    seguidorId = s.seguidorId,
                    nomeSeguidor = s.Seguidor.nome,
                    userNameSeguidor = s.Seguidor.userName
                }).ToList();

                if (seguidoresEnv == null)
                {
                    return BadRequest("Nenhum registro encontrado");
                }

                return Ok(seguidoresEnv);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //
        //Inicio Listar quem está sendo Seguido

        [HttpGet("listarSeguidos/{id}")]
        public IActionResult ListarSeguidos([FromRoute] int id)
        {
            try
            {
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

                return Ok(seguidos);

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

        [HttpGet("listarSeguidores/{id}")]
        public IActionResult ListarSeguidores([FromRoute] int id)
        {
            try
            {
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

                return Ok(seguidores);

            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Listar quem está Seguindo
        //

        //
        //Inicio SeguirUsuario

        [HttpPost("seguirUsuario")]
        public IActionResult SeguirUsuario([FromBody] SeguidorCreatDTO seguirInfos)
        {
            try
            {
                if (seguirInfos.seguidoId == seguirInfos.seguidorId)
                {
                    return BadRequest("O usuario não pode seguir a si mesmo");
                }
                
                SeguidorModel? registroExistente = _ctx.Seguidores.FirstOrDefault(s => s.seguidoId == seguirInfos.seguidoId && s.seguidorId == seguirInfos.seguidorId);

                if (registroExistente != null)
                {
                    return BadRequest("Registro ja existente");
                }

                SeguidorModel? novoRegistro = new SeguidorModel
                {
                    seguidoId = seguirInfos.seguidoId,
                    seguidorId = seguirInfos.seguidorId
                };

                _ctx.Seguidores.Add(novoRegistro);
                _ctx.SaveChanges();

                return Ok("Registro adicionado com sucesso");
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim SeguirUsuario
        //

        //
        //Inicio Deixar de seguir Usuario

        [HttpDelete("DeixarSeguir")]
        public IActionResult DeixarSeguir([FromBody] SeguidorCreatDTO seguirInfo)
        {
            try
            {
                SeguidorModel? registroExistente = _ctx.Seguidores.FirstOrDefault(s => s.seguidoId == seguirInfo.seguidoId && s.seguidorId == seguirInfo.seguidorId);

                if (registroExistente == null)
                {
                    return NotFound("Registro não encontrado");
                }

                _ctx.Seguidores.Remove(registroExistente);
                _ctx.SaveChanges();

                return Ok("Usuario: " + seguirInfo.seguidorId + " Deixou de seguir o usuario: " + seguirInfo.seguidoId);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }

        //Fim Deixar de seguir usuario
        //

    }
}