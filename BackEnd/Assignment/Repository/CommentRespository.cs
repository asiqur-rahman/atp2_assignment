using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Assignment.Models;

namespace Assignment.Repository
{
    public class CommentRespository
    {
        PostDataContext context;
        public CommentRespository()
        {
            context = new PostDataContext();
        }

        public List<Comment> GetAll()
        {
            return context.Comments.Include("Post").ToList();
        }

        public Comment GetById(int pid,int cid)
        {
            Comment comment= context.Comments.Where(x=>x.Id==cid && x.PostId==pid).FirstOrDefault();
            comment.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + pid + "/comments/" + cid, HttpMethod = "GET", Relation = "Self" });
            comment.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts" + pid + "/comments/" + cid, HttpMethod = "POST", Relation = "Create a new Comment for this post" });
            comment.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + pid + "/comments/" + cid, HttpMethod = "PUT", Relation = "Edit a existing Comment resource" });
            comment.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + pid + "/comments/"+cid, HttpMethod = "DELETE", Relation = "Delete a existing Comment resource" });
        
            return comment;
        }

        public void Insert(Comment comment)
        {
            context.Comments.Add(comment);
            context.SaveChanges();
        }

        public void Delete(int pid,int cid)
        {
            context.Comments.Remove(GetById(pid,cid));
            context.SaveChanges();
        }

        public void Edit(Comment comment)
        {
            context.Entry(comment).State = EntityState.Modified;
            context.SaveChanges();
        }

        public List<Comment> GetCommentsWithPost()
        {
            return this.context.Comments.Include("Post").ToList();
        }
    }
}