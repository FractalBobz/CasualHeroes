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
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string AddressLine3 { get; set; }
	}
}