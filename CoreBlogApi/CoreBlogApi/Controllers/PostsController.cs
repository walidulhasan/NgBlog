using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreBlogApi.Models;
using System.IO;
using Microsoft.Extensions.Hosting;

namespace CoreBlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly BlogDbContext _context;
        private readonly IHostEnvironment _hostEnv;

        public PostsController(BlogDbContext context, IHostEnvironment hosting)
        {
            _context = context;
            _hostEnv = hosting;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Posts
                .Include(p => p.Author)
                .Include(p=>p.Category)
                .OrderByDescending(p=>p.PostsId)
                .Where(p=>p.CreatedAt <= DateTime.Now && p.Availability == "Published")
                .ToListAsync();
        }
        // GET: api/Posts/Filter/Back
        [HttpGet("Filter2/{Back}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsBack()
        {
            return await _context.Posts
                .Include(p => p.Author)
                .Include(p => p.Category)
                .OrderByDescending(p => p.PostsId)
                .ToListAsync();
        }

        // GET: api/Posts/ByAuthorId/1
        [HttpGet("ByAuthorId/{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsByAuthorId(int id)
        {
            return await _context.Posts
                .Include(p => p.Author)
                .Include(p => p.Category)
                .OrderByDescending(p => p.PostsId)
                .Where(p=>p.AuthorId == id)
                .ToListAsync();
        }

        // GET: api/Posts/slug
        [HttpGet("{slug}")]
        public async Task<ActionResult<Post>> GetPostBySlug(string slug)
        {
            //var post = await _context.Posts.FindAsync(id);
            var postjoin = await _context.Posts.Include(p => p.Author).Include(p=>p.Category).FirstOrDefaultAsync(i=>i.Slug==slug);

            if (postjoin == null)
            {
                return NotFound();
            }

            return postjoin;
        }

        // GET: api/Posts/category
        [HttpGet("filter/{cat}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostByCat(string cat)
        {
            //var post = await _context.Posts.FindAsync(id);
            var postjoin = await _context.Posts
                                        .Include(p=>p.Author)
                                        .Include(p=>p.Category)
                                        .Where(x=>x.Category.Title == cat && x.CreatedAt <= DateTime.Now && x.Availability == "Published").ToListAsync();

            if (postjoin == null)
            {
                return NotFound();
            }

            return postjoin;
        }

        // GET: api/Posts/author/mahmud sabuj
        [HttpGet("author/{name}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostByAuthor(string name)
        {
            //var post = await _context.Posts.FindAsync(id);
            var postjoin = await _context.Posts
                                        .Include(p => p.Author)
                                        .Include(p => p.Category)
                                        .Where(x => x.Author.Name == name && x.CreatedAt <= DateTime.Now && x.Availability == "Published").ToListAsync();

            if (postjoin == null)
            {
                return NotFound();
            }

            return postjoin;
        }

        // GET: api/Posts/category
        [HttpGet("tags/{tag}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostByTag(string tag)
        {
            //var post = await _context.Posts.FindAsync(id);
            var postjoin = await _context.Posts
                                    .Include(p=>p.Author)
                                    .Include(p=>p.Category)
                                    .Where(x => x.Tags.Contains(tag) && x.CreatedAt <= DateTime.Now && x.Availability == "Published").ToListAsync();

            if (postjoin == null)
            {
                return NotFound();
            }

            return postjoin;
        }

        // GET: api/Posts/category
        [HttpGet("popular")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPopularPost()
        {
            var popularPosts = await _context.Posts
                                .Include(p=>p.Author)
                                .Include(p=>p.Category)
                                .Where(p=>p.CreatedAt <= DateTime.Now && p.Availability == "Published")
                                .OrderByDescending(p=>p.Views)
                                .ToListAsync();

            if (popularPosts == null)
            {
                return NotFound();
            }

            return popularPosts;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //public async Task<IActionResult> PutPost(int id, Post post)
        //{
        //    if (id != post.PostsId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(post).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PostExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
        public IActionResult PutPost(int id, [FromForm] PostVM vm)
        {
            string NewFileName = "";

            if (id != vm.PostsId)
            {
                return BadRequest();
            }
            //file update
            if (vm.Image != null)
            {
                var extFile = Path.Combine(_hostEnv.ContentRootPath, "wwwroot", "Images", vm.ExtImageName);

                if (System.IO.File.Exists(extFile))
                {
                    System.IO.File.Delete(extFile);
                }
                NewFileName = Guid.NewGuid().ToString() + "_" + vm.Image.FileName;
                string NewfilePath = Path.Combine("Images", NewFileName);
                string file = Path.Combine(_hostEnv.ContentRootPath, "wwwroot", NewfilePath);
                var f = new FileStream(file, FileMode.Create);
                vm.Image.CopyTo(f);
                f.Close();
            }else if(vm.Image == null)
            {
                NewFileName = vm.ExtImageName;
            }
            
            //mv to model
            Post post = new Post
            {
                PostsId=vm.PostsId,
                Title = vm.Title,
                Slug = vm.Slug,
                Body = vm.Body,
                Tags = vm.Tags,
                Views = vm.Views,
                ImageName = NewFileName,
                CategoryId = vm.CategoryId,
                AuthorId = vm.AuthorId,
                Availability = vm.Availability,
                CreatedAt = vm.CreatedAt,
                UpdatedAt = vm.UpdatedAt
            };

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
                vm.PostsId = post.PostsId;
                vm.Image = null;
                vm.ImageName = post.ImageName;
                return Ok(vm);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //public async Task<ActionResult<Post>> PostPost(Post post)
        //{
        //    _context.Posts.Add(post);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetPost", new { id = post.PostsId }, post);
        //}
        public IActionResult PostPost([FromForm] PostVM vm)
        {
            string NewFileName = Guid.NewGuid().ToString() + "_" + vm.Image.FileName;
            string NewfilePath = Path.Combine("Images", NewFileName);
            string file = Path.Combine(_hostEnv.ContentRootPath, "wwwroot", NewfilePath);
            var f = new FileStream(file, FileMode.Create);
            vm.Image.CopyTo(f);
            f.Close();

            Post post = new Post { 
                Title = vm.Title, 
                Slug = vm.Slug,
                Body = vm.Body, 
                Tags = vm.Tags,
                ImageName = NewFileName,
                CategoryId=vm.CategoryId,
                AuthorId=vm.AuthorId,
                Availability=vm.Availability,
                CreatedAt=vm.CreatedAt,
                UpdatedAt=vm.UpdatedAt 
            };
            _context.Posts.Add(post);
            _context.SaveChanges();
            vm.PostsId = post.PostsId;
            vm.Image = null;
            vm.ImageName = post.ImageName;
            return Ok(vm);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.PostsId == id);
        }
    }
}
