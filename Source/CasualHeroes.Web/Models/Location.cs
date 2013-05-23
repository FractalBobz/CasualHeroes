using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Models
{
	public class Location
	{
		public int LocationID { get; set; }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string AddressLine3 { get; set; }
	}
}