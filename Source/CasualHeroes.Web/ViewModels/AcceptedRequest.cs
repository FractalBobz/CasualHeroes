using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CasualHeroes.Web.ViewModels
{
	public class AcceptedRequest
	{
		public Request.RequestUser User { get; set; }
		public User.UserRequest Request { get; set; }

		public static AcceptedRequest Convert(Models.AcceptedRequest acceptedRequest)
		{
			return new AcceptedRequest
			{
				User = ViewModels.Request.RequestUser.Convert(acceptedRequest.User),
				Request = ViewModels.User.UserRequest.Convert(acceptedRequest.Request)
			};
		}

		public static IEnumerable<AcceptedRequest> Convert(IEnumerable<Models.AcceptedRequest> acceptedRequests)
		{
			return acceptedRequests.ToList().Select(Convert);
		}
	}
}