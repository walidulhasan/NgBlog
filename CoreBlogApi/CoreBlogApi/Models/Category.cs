using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBlogApi.Models
{
    public class Category
    {
        public Category()
        {
            //this.Posts = new HashSet<Post>();
        }
        [Key]
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }

        //nav
        //public ICollection<Post> Posts { get; set; }
    }
}
