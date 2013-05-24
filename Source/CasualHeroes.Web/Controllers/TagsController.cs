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

        public ActionResult Index()
        {
			var response = new Response { Data = ViewModels.Tag.Convert(db.Tags) };
			return Json(response, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Tags/Details/5

        public ActionResult Details(long id = 0)
        {
            Tag tag = db.Tags.Find(id);
            if (tag == null)
            {
                return HttpNotFound();
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
        public ActionResult Create(Tag tag)
        {
            if (ModelState.IsValid)
            {
                db.Tags.Add(tag);
				db.SaveChanges();
				return Json(new Response { Data = new { tag.TagId } });
            }

			return Json(new Response { Data = "Failed" });
        }

        //
        // GET: /Tags/Edit/5

        public ActionResult Edit(long id = 0)
        {
            Tag tag = db.Tags.Find(id);
            if (tag == null)
            {
                return HttpNotFound();
            }
            return View(tag);
        }

        //
        // POST: /Tags/Edit/5

        [HttpPost]
		public ActionResult Edit(long id, Tag tag)
		{
			tag.TagId = id;
            if (ModelState.IsValid)
            {
                db.Entry(tag).State = EntityState.Modified;
				db.SaveChanges();
				return Json(new Response { Data = "Saved" });
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
        public ActionResult DeleteConfirmed(long id)
        {
            Tag tag = db.Tags.Find(id);
            db.Tags.Remove(tag);
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