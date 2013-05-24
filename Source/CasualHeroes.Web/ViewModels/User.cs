using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.ViewModels
{
	public class User
	{
		public class UserRequest
		{
			public List<string> Tags { get; set; } 
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
			public string DetailsUrl { get; set; }

			public static UserRequest Convert(Models.Request request)
			{
				return new UserRequest
				{
					RequestId = request.RequestId,
					Title = request.Title,
					Description = request.Description,
					Address = request.Address,
					Tags = request.RequestTags.Where(rt => rt.Tag != null).Select(rt => rt.Tag.Name).ToList(),
					Latitude = request.Latitude,
					Longitude = request.Longitude,
					StartDate = request.StartDate,
					EndDate = request.EndDate,
					CreatedOn = request.CreatedOn,
					CreatedBy = request.CreatedBy,
					DetailsUrl = "/Requests/Details/" + request.RequestId
				};
			}

			public static IEnumerable<UserRequest> Convert(IEnumerable<Models.Request> requests)
			{
				return requests.ToList().Select(Convert);
			}
		}

		public List<UserRequest> Requests { get; set; }
		public List<string> Tags { get; set; }
		public long UserId { get; set; }
		public string Identifier { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string DetailsUrl { get; set; }

		public static User Convert(Models.User user)
		{
			return new User
			{
				UserId = user.UserId,
				Identifier = user.Identifier,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				PhoneNumber = user.PhoneNumber,
				DetailsUrl = "/Users/Details/" + user.UserId,
				Requests = UserRequest.Convert(user.Requests).ToList(),
				Tags = user.UserTags.Where(ut => ut.Tag != null).Select(ut => ut.Tag.Name).ToList()
			};
		}

		public static IEnumerable<User> Convert(IEnumerable<Models.User> users)
		{
			return users.ToList().Select(Convert);
		}
	}
}