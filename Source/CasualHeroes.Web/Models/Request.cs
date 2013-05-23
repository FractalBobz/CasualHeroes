using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.Models
{
	public class Request
	{
		public User Owner { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		private List<string> tags;
		public List<string> Tags { get { return tags ?? (tags = new List<string>()); } set { tags = value; } }
		public decimal Latitude { get; set; }
		public decimal Longitude { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string AddressLine3 { get; set; }
	}
}