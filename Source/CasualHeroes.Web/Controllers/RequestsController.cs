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
		// GET: /Requests/?Latitude=5&Longitude=5
		public ActionResult Index(double latitude, double longitude)
		{
			return Json(ViewModels.Request.Convert(
				new CasualHeroesEntities().Requests
					.Where(r => r.Latitude != null && r.Longitude != null)
					.OrderBy(r => Math.Pow((r.Latitude.Value - latitude) * (r.Latitude.Value - latitude) + (r.Longitude.Value - longitude) * (r.Longitude.Value - longitude), 0.5))
					.Take(10)
				),
				JsonRequestBehavior.AllowGet
			);
		}

        // GET: /Requests/Details/5
        public ActionResult Details(long id)
        {
			return Json(ViewModels.Request.Convert(new CasualHeroesEntities().Requests.Single(r => r.RequestId == id)), JsonRequestBehavior.AllowGet);
        }

        // GET: /Requests/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Requests/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
	            var request = new Request
	            {
					Title = collection["Title"],
					Description = collection["Description"],
					Address = collection["Address"],
					Tags = collection["Tags"],
					Latitude = double.Parse(collection["Latitude"]),
					Longitude = double.Parse(collection["Longitude"]),
					StartDate = DateTimeOffset.Parse(collection["StartDate"]),
					EndDate = DateTimeOffset.Parse(collection["EndDate"]),
					CreatedBy = collection["CreatedBy"]
	            };

	            var context = new CasualHeroesEntities();
	            context.Requests.Add(request);
	            context.SaveChanges();

                return RedirectToAction("Details", new { id = request.RequestId } );
            }
            catch
            {
				return View();
            }
        }

        // GET: /Requests/Edit/5
        public ActionResult Edit(int id)
		{
			try
			{
				var context = new CasualHeroesEntities();
				var request = context.Requests.Single(r => r.RequestId == id);
				return View(request);
			}
			catch (Exception)
			{
				return RedirectToAction("Details", new { id });
			}
        }

        // POST: /Requests/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
		{
	        using (var context = new CasualHeroesEntities())
	        {
		        var request = context.Requests.Single(r => r.RequestId == id);
		        try
		        {
			        request.Title = collection["Title"];
			        request.Description = collection["Description"];
			        request.Address = collection["Address"];
			        request.Tags = collection["Tags"];
			        request.Latitude = double.Parse(collection["Latitude"]);
			        request.Longitude = double.Parse(collection["Longitude"]);
			        request.StartDate = DateTimeOffset.Parse(collection["StartDate"]);
			        request.EndDate = DateTimeOffset.Parse(collection["EndDate"]);
			        request.CreatedBy = collection["CreatedBy"];

			        context.SaveChanges();

			        return RedirectToAction("Details", new { id = request.RequestId });
		        }
		        catch
		        {
			        return View(request);
		        }
	        }
		}

        // GET: /Requests/Delete/5
        public ActionResult Delete(int id)
		{
			var context = new CasualHeroesEntities();
			var request = context.Requests.Single(r => r.RequestId == id);
			return View(request);
        }

        // POST: /Requests/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
		{
			var context = new CasualHeroesEntities();
			var request = context.Requests.Single(r => r.RequestId == id);
            try
			{
				context.Requests.Remove(request);
				context.SaveChanges();
				return Json("Deleted");
			}
            catch
            {
				return View(request);
            }
        }
    }
}
