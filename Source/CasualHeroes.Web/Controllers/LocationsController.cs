using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CasualHeroes.Models;

namespace CasualHeroes.Controllers
{
	public class LocationsController : Controller
	{
		//
		// GET: /Locations/

		public ActionResult Index(decimal latitude, decimal longitude)
		{
			var random = new Random();
			var resultCount = random.Next(10);
			var results = new List<Location>();
			for (var i = 0; i < resultCount; ++i)
			{
				results.Add(new Location 
				{
					LocationID = random.Next(5000),
					Latitude = latitude + random.Next(60) - 30,
					Longitude = longitude + random.Next(60) - 30,
				});
			}
			return View(results);
		}
	}
}
