﻿using System;
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
	public class UsersController : Controller
	{
		private readonly CasualHeroesEntities db = new CasualHeroesEntities();

		//
		// GET: /Users/

		public ActionResult Index(bool html = false)
		{
			var users = db.Users.Include(u => u.Requests).Include(u => u.UserTags);
			if (html)
			{
				return View(users);
			}
			var response = new Response { Data = ViewModels.User.Convert(users) };
			return Json(response, JsonRequestBehavior.AllowGet);
		}

		//
		// GET: /Users/Details/5

		public ActionResult Details(long id = 0, bool html = false)
		{
			var user = db.Users.Find(id);
			if (user == null)
			{
				return HttpNotFound();
			}

			if (html)
			{
				return View(user);
			}
			var response = new Response { Data = ViewModels.User.Convert(user) };
			return Json(response, JsonRequestBehavior.AllowGet);
		}

		//
		// GET: /Users/Create

		public ActionResult Create()
		{
			return View();
		}

		//
		// POST: /Users/Create

		[HttpPost]
		public ActionResult Create(User user, bool html = false)
		{
			user.CreatedOn = DateTime.UtcNow;
			var tags = TagsSplitter.Split(db, user.Tags);
			user.UserTags = tags.Select(t => new UserTag { User = user, Tag = t }).ToList();
			if (ModelState.IsValid)
			{
				db.Users.Add(user);
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = user.UserId });
				}
				return Json(new Response { Data = new { user.UserId } });
			}

			if (html)
			{
				return View(user);
			}
			return Json(new Response { Data = "Failed" });
		}

		//
		// GET: /Users/Edit/5

		public ActionResult Edit(long id = 0)
		{
			User user = db.Users.Find(id);
			if (user == null)
			{
				return HttpNotFound();
			}
			return View(user);
		}

		//
		// POST: /Users/Edit/5

		[HttpPost]
		public ActionResult Edit(long id, User user, bool html = false)
		{
			user.UserId = id;
			var tags = TagsSplitter.Split(db, user.Tags);
			var existingTags = db.UserTags.Where(ut => ut.UserId == user.UserId).Where(ut => ut.Tag != null).ToList();
			var existingTagNames = existingTags.Select(ut => ut.Tag.Name).ToList();
			foreach (var tag in tags.Where(t => !existingTagNames.Contains(t.Name)))
			{
				db.UserTags.Add(new UserTag { User = user, Tag = tag });
			}
			foreach (var userTag in existingTags.Where(ut => !tags.Select(t => t.Name).Contains(ut.Tag.Name)))
			{
				db.UserTags.Remove(userTag);
			}

			if (ModelState.IsValid)
			{
				db.Entry(user).State = EntityState.Modified;
				db.SaveChanges();

				if (html)
				{
					return RedirectToAction("Details", new { id = user.UserId });
				}
				return Json(new Response { Data = "Saved" });
			}

			if (html)
			{
				return View(user);
			}
			return Json(new Response { Data = "Failed" });
		}

		//
		// GET: /Users/Delete/5

		public ActionResult Delete(long id = 0)
		{
			User user = db.Users.Find(id);
			if (user == null)
			{
				return HttpNotFound();
			}
			return View(user);
		}

		//
		// POST: /Users/Delete/5

		[HttpPost, ActionName("Delete")]
		public ActionResult DeleteConfirmed(long id, bool html = false)
		{
			User user = db.Users.Find(id);
			db.Users.Remove(user);
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