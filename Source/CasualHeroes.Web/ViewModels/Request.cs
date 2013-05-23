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
			public long UserId { get; set; }
			public string Identifier { get; set; }
			public string FirstName { get; set; }
			public string LastName { get; set; }
			public string Email { get; set; }
			public string PhoneNumber { get; set; }

			public RequestUser()
			{
			}

			public RequestUser(Models.User user)
			{
				UserId = user.UserId;
				Identifier = user.Identifier;
				FirstName = user.FirstName;
				LastName = user.LastName;
				Email = user.Email;
				PhoneNumber = user.PhoneNumber;
			}
		}

		public RequestUser User { get; set; }
		public long RequestId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Address { get; set; }
		public string Tags { get; set; }
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
				User = request.User == null ? null : new RequestUser(request.User),
				RequestId = request.RequestId,
				Title = request.Title,
				Description = request.Description,
				Address = request.Address,
				Tags = request.Tags,
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