using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Assignment.Models;
using Assignment.Repository;

namespace Assignment.Controllers
{
    [RoutePrefix("api/posts")]
    public class PostController : ApiController
    {
        PostRepository postRepo = new PostRepository();
        CommentRespository comRepo = new CommentRespository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(postRepo.GetAll());
        }
        [Route("")]
        public IHttpActionResult Post(Post post)
        {
            postRepo.Insert(post);
            string url = Url.Link("GetPostById", new { id = post.Id });
            return Created(url, post);
        }
        [Route("{id}", Name = "GetPostById")]
        public IHttpActionResult Get(int id)
        {
            Post post = postRepo.GetById(id);
            if (post == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            return Ok(post);
        }
        [Route("{id}")]
        public IHttpActionResult Put([FromBody]Post post, [FromUri]int id)
        {
            post.Id = id;
            postRepo.Edit(post);
            return Ok(post);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            postRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }



        //--------------------



        [Route("{pid}/comments")]
        public IHttpActionResult GetAllCommentsForaPost(int pid)
        {
            return Ok(postRepo.GetAllCommentsForaPost(pid));
        }

        [Route("{pid}/comments/{cid}")]
        public IHttpActionResult GetACommentsForaPost(int pid,int cid)
        {
            return Ok(comRepo.GetById(pid,cid));
        }

        [Route("{pid}/comments")]
        public IHttpActionResult Post(int pid,Comment comment)
        {
            comment.PostId = pid;
            comRepo.Insert(comment);
            string url = Url.Link("GetPostById", new { id = comment.PostId });
            return Created(url, comment);
        }

        [Route("{pid}/comments/{cid}")]
        public IHttpActionResult Put(int pid,int cid,Comment comment)
        {
            comment.Id = cid;
            comment.PostId = pid;
            comRepo.Edit(comment);
            return Ok(comment);
        }

        [Route("{pid}/comments/{cid}")]
        public IHttpActionResult Delete(int pid,int cid)
        {
            comRepo.Delete(pid,cid);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("comments")]
        public IHttpActionResult GetPostWithComments()
        {
            return Ok(postRepo.GetPostWithComments());
        }
    }
}
