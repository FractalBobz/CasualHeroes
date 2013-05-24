using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CasualHeroes.Web.Models;

namespace CasualHeroes.Web.Helpers
{
	public static class TagsSplitter
	{
		public static IEnumerable<Tag> Split(CasualHeroesEntities db, string tags)
		{
			var result = new List<Tag>();
			if (tags == null) return result;
			foreach (var name in tags.Split(',').Select(t => t.Trim().ToLower()))
			{
				var tag = db.Tags.SingleOrDefault(t => t.Name == name);
				result.Add(tag ?? new Tag { Name = name });
			}
			return result;
		}
	}
}