﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CasualHeroes.Web.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CasualHeroesEntities : DbContext
    {
        public CasualHeroesEntities()
            : base("name=CasualHeroesEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<AcceptedRequest> AcceptedRequests { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestTag> RequestTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTag> UserTags { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
