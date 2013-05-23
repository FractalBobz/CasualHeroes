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
			var results = new List<int>();
			for (var i = 0; i < resultCount; ++i)
			{
				results.Add(random.Next(5000));
			}
			var model = new LocationsIndexViewModel
			{
				Results = results
			};
			return View(model);
		}
	}
}
