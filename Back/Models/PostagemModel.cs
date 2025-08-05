using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Back.Models
{
    public class PostagemModel
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string conteudo { get; set; }
        public int UsuarioId { get; set; }
        public UsuarioModel Usuario { get; set; } = null!;
    }
}