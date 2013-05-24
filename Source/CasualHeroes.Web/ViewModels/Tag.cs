using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.ViewModels
{
	public class Tag
	{
		public long TagId { get; set; }
		public string Name { get; set; }

		public static Tag Convert(Models.Tag user)
		{
			return new Tag
			{
				TagId = user.TagId,
				Name = user.Name
			};
		}

		public static IEnumerable<Tag> Convert(IEnumerable<Models.Tag> tags)
		{
			return tags.ToList().Select(Convert);
		}
	}
}