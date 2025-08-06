using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;

namespace Back.DTO.SeguidorDTO
{
    public class SeguidorListDTO
    {
        public List<SeguidorModel> Seguidores { get; set; } = new();        
    }
}