using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.Models
{
	public class User
	{
		public string GivenName { get; set; }
		public string FamilyName { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
	}
}