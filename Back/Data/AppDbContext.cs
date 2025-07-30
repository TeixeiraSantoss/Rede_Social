using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<PostagemModel> Postagens { get; set; }
        public DbSet<SeguidorModel> Seguidores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SeguidorModel>()
                .HasKey(s => new { s.seguidorId, s.seguidoId }); // chave composta

            modelBuilder.Entity<SeguidorModel>()
                .HasOne(s => s.Seguidor)
                .WithMany(u => u.Seguindo)
                .HasForeignKey(s => s.seguidorId)
                .OnDelete(DeleteBehavior.Restrict); // impede cascata

            modelBuilder.Entity<SeguidorModel>()
                .HasOne(s => s.Seguido)
                .WithMany(u => u.Seguidores)
                .HasForeignKey(s => s.seguidoId)
                .OnDelete(DeleteBehavior.Restrict);
                }
    }
}