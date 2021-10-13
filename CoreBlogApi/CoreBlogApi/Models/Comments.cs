using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBlogApi.Models
{
    public class Comments
    {
        public Comments()
        {
            
        }
        public int CommentsId { get; set; }
        public string Author { get; set; }
        public string Email { get; set; }
        public string Comment { get; set; }
        public DateTime cDate { get; set; }
        [ForeignKey("Post")]
        public int PostsId { get; set; }
        //nva
        public Post Post { get; set; }
    }
}
