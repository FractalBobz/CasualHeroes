using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CasualHeroes.Web.Models;

namespace CasualHeroes.Web.Controllers
{
	public class LocationsController : Controller
	{
		//
		// GET: /Locations/

		public ActionResult Index()
		{
			return View();
		}
	}
}
