//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class UserTag
    {
        public long UserTagId { get; set; }
        public long UserId { get; set; }
        public long TagId { get; set; }
    
        public virtual User User { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
