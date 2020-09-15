using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Assignment.Models;

namespace Assignment.Repository
{
    public class PostRepository
    {
        PostDataContext context;

        public PostRepository()
        {
            context = new PostDataContext();
        }

        public List<Post> GetAll()
        {
            List<Post> posts = context.Posts.ToList();
            //HATEOAS implementation
            for(int i=0; i<posts.Count; i++)
            {
                posts[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + posts[i].Id, HttpMethod = "GET", Relation = "Self" });
                posts[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts", HttpMethod = "POST", Relation = "Create a new Post resource" });
                posts[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + posts[i].Id, HttpMethod = "PUT", Relation = "Edit a existing Post resource" });
                posts[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + posts[i].Id, HttpMethod = "DELETE", Relation = "Delete a existing Post resource" });
                posts[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + posts[i].Id+"/comments", HttpMethod = "Comments", Relation = "See this post Comments" });
            }
            return posts;
        }

        public Post GetById(int id)
        {
            Post post= context.Posts.Find(id);
                post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "GET", Relation = "Self" });
                post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts", HttpMethod = "POST", Relation = "Create a new Post resource" });
                post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "PUT", Relation = "Edit a existing Post resource" });
                post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "DELETE", Relation = "Delete a existing Post resource" });
                post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id + "/comments", HttpMethod = "Comments", Relation = "See this post Comments" });
            return post;
            }

            public void Insert(Post post)
        {
            context.Posts.Add(post);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            context.Posts.Remove(GetById(id));
            context.SaveChanges();
        }

        public void Edit(Post post)
        {
            context.Entry(post).State = EntityState.Modified;
            context.SaveChanges();
        }



        public Post GetAllCommentsForaPost(int id)
        {
            Post post= context.Posts.Include("Comments").Where(x=>x.Id==id).FirstOrDefault();
            post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "GET", Relation = "Self" });
            post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts", HttpMethod = "POST", Relation = "Create a new Post resource" });
            post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "PUT", Relation = "Edit a existing Post resource" });
            post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id, HttpMethod = "DELETE", Relation = "Delete a existing Post resource" });
            post.HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id + "/comments", HttpMethod = "Comments", Relation = "See this post Comments" });

            for (int i = 0; i < post.Comments.Count; i++)
            {
                post.Comments[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id+"/comments/"+ post.Comments[i].Id, HttpMethod = "GET", Relation = "Self" });
                post.Comments[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts" + post.Id + "/comments/" + post.Comments[i].Id, HttpMethod = "POST", Relation = "Create a new Comment for this post" });
                post.Comments[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id + "/comments/" + post.Comments[i].Id, HttpMethod = "PUT", Relation = "Edit a existing Comment resource" });
                post.Comments[i].HyperLinks.Add(new Hyperlink() { HRef = "http://localhost:6100/api/posts/" + post.Id + "/comments/" + post.Comments[i].Id, HttpMethod = "DELETE", Relation = "Delete a existing Comment resource" });
            }
            return post;
        }
        
        public void PutCommentToaPost(Comment comment)
        {
            context.Comments.Add(comment);
            context.SaveChanges();
        }

        public List<Post> GetPostWithComments()
        {
            return context.Posts.Include("Comments").ToList();
        }

    }
}