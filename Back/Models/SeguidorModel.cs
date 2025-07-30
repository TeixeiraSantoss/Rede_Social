using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class SeguidorModel
    {
        public int seguidorId { get; set; }
        public UsuarioModel Seguidor { get; set; } = null!; // Usuario que está SEGUINDO
        public int seguidoId { get; set; }
        public UsuarioModel Seguido { get; set; } = null!; // Usuario que está SENDO SEGUIDO
    }
}