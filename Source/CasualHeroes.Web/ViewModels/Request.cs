using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.ViewModels
{
	public class Request
	{
		public class RequestUser
		{
			public List<string> Tags { get; set; }
			public long UserId { get; set; }
			public string Identifier { get; set; }
			public string FirstName { get; set; }
			public string LastName { get; set; }
			public string Email { get; set; }
			public string PhoneNumber { get; set; }

			public static RequestUser Convert(Models.User user)
			{
				return new RequestUser
				{
					Tags = user.UserTags.Where(ut => ut.Tag != null).Select(ut => ut.Tag.Name).ToList(),
					UserId = user.UserId,
					Identifier = user.Identifier,
					FirstName = user.FirstName,
					LastName = user.LastName,
					Email = user.Email,
					PhoneNumber = user.PhoneNumber
				};
			}

			public static IEnumerable<RequestUser> Convert(IEnumerable<Models.User> users)
			{
				return users.ToList().Select(Convert);
			}
		}

		public RequestUser User { get; set; }
		public List<string> Tags { get; set; }
		public List<RequestUser> Participants { get; set; }
		public long RequestId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Address { get; set; }
		public double? Latitude { get; set; }
		public double? Longitude { get; set; }
		public DateTimeOffset? StartDate { get; set; }
		public DateTimeOffset? EndDate { get; set; }
		public DateTimeOffset? CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		
		public static Request Convert(Models.Request request)
		{
			return new Request
			{
				User = request.User == null ? null : RequestUser.Convert(request.User),
				Tags = request.RequestTags.Where(rt => rt.Tag != null).Select(rt => rt.Tag.Name).ToList(),
				Participants = RequestUser.Convert(request.AcceptedRequests.Select(ar => ar.User)).ToList(),
				RequestId = request.RequestId,
				Title = request.Title,
				Description = request.Description,
				Address = request.Address,
				Latitude = request.Latitude,
				Longitude = request.Longitude,
				StartDate = request.StartDate,
				EndDate = request.EndDate,
				CreatedOn = request.CreatedOn,
				CreatedBy = request.CreatedBy
			};
		}

		public static IEnumerable<Request> Convert(IEnumerable<Models.Request> requests)
		{
			return requests.ToList().Select(Convert);
		}
	}
}