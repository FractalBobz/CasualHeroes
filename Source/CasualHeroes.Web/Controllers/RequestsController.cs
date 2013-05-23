using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CasualHeroes.Web.Models;
using System.Data.SqlClient;

namespace CasualHeroes.Web.Controllers
{
    public class RequestsController : Controller
	{
		private readonly CasualHeroesEntities db = new CasualHeroesEntities();

		//
		// GET: /Requests/?Latitude=5&Longitude=5

		public ActionResult Index(double latitude, double longitude)
		{
			return Json(ViewModels.Request.Convert(
				db.Requests
					.Where(r => r.Latitude != null && r.Longitude != null)
					.OrderBy(r => Math.Pow((r.Latitude.Value - latitude) * (r.Latitude.Value - latitude) + (r.Longitude.Value - longitude) * (r.Longitude.Value - longitude), 0.5))
					.Take(10)
				),
				JsonRequestBehavior.AllowGet
			);
		}

		//
        // GET: /Requests/Details/5

        public ActionResult Details(long id)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			return Json(ViewModels.Request.Convert(request), JsonRequestBehavior.AllowGet);
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
        public ActionResult Create(Request request)
		{
			if (ModelState.IsValid)
			{
				db.Requests.Add(request);
				db.SaveChanges();
				return RedirectToAction("Details", new { id = request.RequestId });
			}

			return View(request);
        }

		//
        // GET: /Requests/Edit/5

		public ActionResult Edit(long id = 0)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			return View(request);
        }

		//
        // POST: /Requests/Edit/5

        [HttpPost]
		public ActionResult Edit(long id, Request request)
        {
	        request.RequestId = id;
			if (ModelState.IsValid)
			{
				db.Entry(request).State = EntityState.Modified;
				db.SaveChanges();
		        return RedirectToAction("Details", new { id = request.RequestId });
			}
	        return View(request);
		}

        // GET: /Requests/Delete/5
		public ActionResult Delete(long id)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			return View(request);
        }

        // POST: /Requests/Delete/5
		[HttpPost, ActionName("Delete")]
		public ActionResult DeleteConfirmed(long id)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			db.Requests.Remove(request);
			db.SaveChanges();
			return Json("Deleted");
        }

		protected override void Dispose(bool disposing)
		{
			db.Dispose();
			base.Dispose(disposing);
		}
    }
}
