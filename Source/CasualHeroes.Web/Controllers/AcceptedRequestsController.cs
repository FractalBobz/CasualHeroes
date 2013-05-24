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
    public class AcceptedRequestsController : Controller
    {
        private readonly CasualHeroesEntities db = new CasualHeroesEntities();

        //
        // GET: /AcceptedRequest/

        public ActionResult Index()
        {
			var response = new Response { Data = ViewModels.AcceptedRequest.Convert(db.AcceptedRequests.Include(a => a.Request).Include(a => a.User)) };
			return Json(response, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /AcceptedRequest/Details/5

        public ActionResult Details(long id = 0)
		{
			var acceptedRequest = db.AcceptedRequests.Find(id);
			if (acceptedRequest == null)
            {
                return HttpNotFound();
			}
			var response = new Response { Data = ViewModels.AcceptedRequest.Convert(acceptedRequest) };
			return Json(response, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /AcceptedRequest/Create

        public ActionResult Create()
        {
            ViewBag.RequestId = new SelectList(db.Requests, "RequestId", "Title");
            ViewBag.UserId = new SelectList(db.Users, "UserId", "Identifier");
            return View();
        }

        //
        // POST: /AcceptedRequest/Create

        [HttpPost]
        public ActionResult Create(AcceptedRequest acceptedrequest)
        {
            if (ModelState.IsValid)
            {
                db.AcceptedRequests.Add(acceptedrequest);
				db.SaveChanges();
				return Json(new Response { Data = new { acceptedrequest.AcceptedRequestId } });
			}
			return Json(new Response { Data = "Failed" });
        }

        //
        // GET: /AcceptedRequest/Edit/5

        public ActionResult Edit(long id = 0)
        {
            AcceptedRequest acceptedrequest = db.AcceptedRequests.Find(id);
            if (acceptedrequest == null)
            {
                return HttpNotFound();
            }
            ViewBag.RequestId = new SelectList(db.Requests, "RequestId", "Title", acceptedrequest.RequestId);
            ViewBag.UserId = new SelectList(db.Users, "UserId", "Identifier", acceptedrequest.UserId);
            return View(acceptedrequest);
        }

        //
        // POST: /AcceptedRequest/Edit/5

        [HttpPost]
        public ActionResult Edit(AcceptedRequest acceptedrequest)
        {
            if (ModelState.IsValid)
            {
                db.Entry(acceptedrequest).State = EntityState.Modified;
				db.SaveChanges();
				return Json(new Response { Data = "Saved" });
			}
			return Json(new Response { Data = "Failed" });
        }

        //
        // GET: /AcceptedRequest/Delete/5

        public ActionResult Delete(long id = 0)
        {
            AcceptedRequest acceptedrequest = db.AcceptedRequests.Find(id);
            if (acceptedrequest == null)
            {
                return HttpNotFound();
            }
            return View(acceptedrequest);
        }

        //
        // POST: /AcceptedRequest/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(long id)
        {
            AcceptedRequest acceptedrequest = db.AcceptedRequests.Find(id);
            db.AcceptedRequests.Remove(acceptedrequest);
			db.SaveChanges();
			return Json(new Response { Data = "Deleted" });
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}