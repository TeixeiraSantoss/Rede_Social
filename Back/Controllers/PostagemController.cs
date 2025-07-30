using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Data;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Cadastrar([FromBody] PostagemModel postagem)
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

        //Fim Cadastrar
        //

        //
        //Inicio Listar

        [HttpGet("listar")]
        public IActionResult Listar()
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

        //Fim Listar
        //

        //
        //Inicio Editar

        [HttpPatch("editar/{id}")]
        public IActionResult Editar([FromBody] PostagemModel postagem, [FromRoute] int id)
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

    }
}