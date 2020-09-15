
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Assignment.Models
{
    public class PostDataContext:DbContext
    {
        public PostDataContext()
        {
            //Database.SetInitializer<InventoryDataContext>(new DropCreateDatabaseIfModelChanges<InventoryDataContext>());
            //Database.SetInitializer<InventoryDataContext>(new MigrateDatabaseToLatestVersion<InventoryDataContext,Configuration>());
        }

        virtual public DbSet<Post> Posts { get; set; }
        virtual public DbSet<Comment> Comments{ get; set; }
       
    }
}