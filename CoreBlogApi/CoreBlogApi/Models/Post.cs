using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBlogApi.Models
{
    public class Post
    {
        [Key]
        public int PostsId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Body { get; set; }
        public string Tags { get; set; }
        public int Views { get; set; }
        public string ImageName { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        public string Availability { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //nva
        public Category Category { get; set; }
        public Author Author { get; set; }
    }
}
