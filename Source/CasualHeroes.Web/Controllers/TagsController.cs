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
    public class TagsController : Controller
    {
        private readonly CasualHeroesEntities db = new CasualHeroesEntities();

        //
        // GET: /Tags/

		public ActionResult Index(bool html = false)
        {
	        var tags = db.Tags;
			
			if (html)
			{
				return View(tags);
			}
			var response = new Response { Data = ViewModels.Tag.Convert(tags) };
			return Json(response, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Tags/Details/5

		public ActionResult Details(long id = 0, bool html = false)
        {
            var tag = db.Tags.Find(id);
            if (tag == null)
            {
                return HttpNotFound();
			}

			if (html)
			{
				return View(tag);
			}
			var response = new Response { Data = ViewModels.Tag.Convert(tag) };
			return Json(response, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Tags/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Tags/Create

        [HttpPost]
		public ActionResult Create(Tag tag, bool html = false)
        {
            if (ModelState.IsValid)
            {
                db.Tags.Add(tag);
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = tag.TagId });
				}
				return Json(new Response { Data = new { tag.TagId } });
            }

			if (html)
			{
				return View(tag);
			}
			return Json(new Response { Data = "Failed" });
        }

        //
        // GET: /Tags/Edit/5

        public ActionResult Edit(long id = 0)
        {
            var tag = db.Tags.Find(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            return View(tag);
        }

        //
        // POST: /Tags/Edit/5

        [HttpPost]
		public ActionResult Edit(long id, Tag tag, bool html = false)
		{
			tag.TagId = id;
            if (ModelState.IsValid)
            {
                db.Entry(tag).State = EntityState.Modified;
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = tag.TagId });
				}
				return Json(new Response { Data = "Saved" });
			}

			if (html)
			{
				return View(tag);
			}
			return Json(new Response { Data = "Failed" });
        }

        //
        // GET: /Tags/Delete/5

        public ActionResult Delete(long id = 0)
        {
            Tag tag = db.Tags.Find(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            return View(tag);
        }

        //
        // POST: /Tags/Delete/5

        [HttpPost, ActionName("Delete")]
		public ActionResult DeleteConfirmed(long id, bool html = false)
        {
            var tag = db.Tags.Find(id);
            db.Tags.Remove(tag);
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