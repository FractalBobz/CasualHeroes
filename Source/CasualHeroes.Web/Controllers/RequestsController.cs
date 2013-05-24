using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CasualHeroes.Web.Helpers;
using CasualHeroes.Web.Models;

namespace CasualHeroes.Web.Controllers
{
	public class RequestsController : Controller
	{
		private readonly CasualHeroesEntities db = new CasualHeroesEntities();

		//
		// GET: /Requests/

		public ActionResult Index(double? latitude = null, double? longitude = null, bool html = false)
		{
			IQueryable<Request> requests;
			if (latitude == null || longitude == null)
			{
				requests = db.Requests
					.Include(r => r.User)
					.Include(r => r.RequestTags)
					.Where(r => r.EndDate > DateTime.UtcNow)
					.OrderByDescending(r => r.EndDate)
					.Take(10);
			}
			else
			{
				requests = db.Requests
					.Include(r => r.User)
					.Include(r => r.RequestTags)
					.Where(r => r.EndDate > DateTime.UtcNow)
					.Where(r => r.Latitude != null && r.Longitude != null)
					.OrderBy(r => Math.Pow((r.Latitude.Value - latitude.Value) * (r.Latitude.Value - latitude.Value) + (r.Longitude.Value - longitude.Value) * (r.Longitude.Value - longitude.Value), 0.5))
					.Take(10);
			}

			if (html)
			{
				return View(requests);
			}

			var response = new Response
			{
				Data = ViewModels.Request.Convert(requests)
			};
			return Json(response, JsonRequestBehavior.AllowGet);
		}

		//
		// GET: /Requests/Details/5

		public ActionResult Details(long id = 0, bool html = false)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}

			if (html)
			{
				return View(request);
			}
			var response = new Response { Data = ViewModels.Request.Convert(request) };
			return Json(response, JsonRequestBehavior.AllowGet);
		}

		//
		// GET: /Requests/Create

		public ActionResult Create()
		{
			ViewBag.UserId = new SelectList(db.Users, "UserId", "Identifier");
			return View();
		}

		//
		// POST: /Requests/Create

		[HttpPost]
		public ActionResult Create(Request request, bool html = false)
		{
			request.CreatedOn = DateTime.UtcNow;
			var tags = TagsSplitter.Split(db, request.Tags);
			request.RequestTags = tags.Select(t => new RequestTag() { Request = request, Tag = t }).ToList();
			if (ModelState.IsValid)
			{
				db.Requests.Add(request);
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = request.RequestId });
				}
				return Json(new Response { Data = new { request.RequestId } });
			}

			if (html)
			{
				return View(request);
			}
			return Json(new Response { Data = "Failed" });
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
			ViewBag.UserId = new SelectList(db.Users, "UserId", "Identifier", request.UserId);
			return View(request);
		}

		//
		// POST: /Requests/Edit/5

		[HttpPost]
		public ActionResult Edit(long id, Request request, bool html = false)
		{
			request.RequestId = id;
			var tags = TagsSplitter.Split(db, request.Tags);
			var existingTags = db.RequestTags.Where(rt => rt.RequestId == request.RequestId).ToList();
			var existingTagNames = existingTags.Select(rt => rt.Tag.Name).ToList();
			foreach (var tag in tags.Where(t => !existingTagNames.Contains(t.Name)))
			{
				db.RequestTags.Add(new RequestTag() { Request = request, Tag = tag });
			}
			foreach (var requestTag in existingTags.Where(rt => !tags.Select(t => t.Name).Contains(rt.Tag.Name)))
			{
				db.RequestTags.Remove(requestTag);
			}

			if (ModelState.IsValid)
			{
				db.Entry(request).State = EntityState.Modified;
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = request.RequestId });
				}
				return Json(new Response { Data = "Saved" });
			}

			if (html)
			{
				return View(request);
			}
			return Json(new Response { Data = "Failed" });
		}

		//
		// GET: /Requests/Delete/5

		public ActionResult Delete(long id = 0)
		{
			Request request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			return View(request);
		}

		//
		// POST: /Requests/Delete/5

		[HttpPost, ActionName("Delete")]
		public ActionResult DeleteConfirmed(long id, bool html = false)
		{
			var request = db.Requests.Find(id);
			if (request == null)
			{
				return HttpNotFound();
			}
			db.Requests.Remove(request);
			db.SaveChanges();

			if (html)
			{
				return RedirectToAction("Index");
			}
			return Json(new Response { Data = "Deleted" });
		}

		protected override void Dispose(bool disposing)
		{
			db.Dispose();
			base.Dispose(disposing);
		}
	}
}