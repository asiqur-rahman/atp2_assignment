using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Assignment.Repository;
using Assignment.Models;

namespace Assignment.Controllers
{
    [RoutePrefix("api/comments")]
    public class CommentController : ApiController
    {
        PostRepository postRepo = new PostRepository();
        CommentRespository comRepo = new CommentRespository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(comRepo.GetAll());
        }

        
    }
}
