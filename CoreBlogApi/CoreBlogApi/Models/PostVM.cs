using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBlogApi.Models
{
    public class PostVM
    {
        public int PostsId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Body { get; set; }
        public string Tags { get; set; }
        public int Views { get; set; }
        public string ImageName { get; set; }
        public string ExtImageName { get; set; }
        public IFormFile Image { get; set; }
        public int CategoryId { get; set; }
        public int AuthorId { get; set; }
        public string Availability { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
