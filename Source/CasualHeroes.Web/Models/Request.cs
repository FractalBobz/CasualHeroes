using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.Models
{
	public class Request
	{
		public Location Location { get; set; }
		public User Owner { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		private List<string> tags;
		public List<string> Tags { get { return tags ?? (tags = new List<string>()); } set { tags = value; } }
	}
}