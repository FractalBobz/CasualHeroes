using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CasualHeroes.Web.Models;
using System.Data.SqlClient;

namespace CasualHeroes.Web.Controllers
{
    public class RequestsController : Controller
    {
        //
        // GET: /Requests/

		public ActionResult Index(double latitude, double longitude)
		{
			var random = new Random();
			var resultCount = random.Next(10);
			var results = new List<Request>();
			for (var i = 0; i < resultCount; ++i)
			{
				results.Add(new Request
				{
					Latitude = latitude + random.Next(60) - 30,
					Longitude = longitude + random.Next(60) - 30,
					Address = "Add",
					StartDate = DateTime.Now,
					EndDate = DateTime.Now.AddDays(1),
					User = new User
					{
						FirstName = "John",
						LastName = "Smith",
						Email = "jsmith@casual-heroes.org",
						PhoneNumber = "987-654-3210"
					},
					Title = "Title",
					Description = "Description",
					Tags = "Awesomeness, Wizardry, Aloof Demeanor" //new List<string> { "Awesomeness", "Wizardry", "Aloof Demeanor" }
				});
			}
			return View(results);
        }

        //
        // GET: /Requests/Details/5

        public ActionResult Details(int id)
		{
			var random = new Random();
			var request = new Request
			{
				Latitude = random.Next(60) - 30,
				Longitude = random.Next(60) - 30,
				Address = "Address",
				StartDate = DateTime.Now,
				EndDate = DateTime.Now.AddDays(1),
				User = new User
				{
					FirstName = "John",
					LastName = "Smith",
					Email = "jsmith@casual-heroes.org",
					PhoneNumber = "987-654-3210"
				},
				Title = "Title",
				Description = "Description",
				Tags = "Awesomeness, Wizardry, Aloof Demeanor" //new List<string> { "Awesomeness", "Wizardry", "Aloof Demeanor" }
			};
			return View(request);
        }

        //
        // GET: /Requests/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Requests/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Requests/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Requests/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Requests/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Requests/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
