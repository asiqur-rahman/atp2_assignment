﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assignment.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int PostId { get; set; }
        public List<Hyperlink> HyperLinks = new List<Hyperlink>();

        public Post Post { set; get; }

    }
}