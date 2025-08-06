using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;

namespace Back.DTO.SeguidorDTO
{
    public class SeguindoListDTO
    {
        public List<SeguidorModel> Seguindo { get; set; } = new();
    }
}