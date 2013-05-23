using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.Models
{
	public class Volunteer
	{
		public User User { get; set; }
		public Request Request { get; set; }
	}
}