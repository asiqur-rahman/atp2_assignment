using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assignment.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public List<Hyperlink> HyperLinks = new List<Hyperlink>();

        public List<Comment> Comments { set; get; }
    }
}