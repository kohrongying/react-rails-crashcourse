## Welcome to Lesson 1

### What we're going to achieve
- Understand why Rails as backend 
- Set up a rails backend
- Configure models and postgresql

### Introduction
Ruby on Rails (RoR) is a framework that runs on the Ruby language. I like Ruby as a language, as it is easy to read and also easy to pick up. RoR is good as a backend framework for these reasons:
- Out of the box solution
- Model-View-Controller framework
- A lot of scaffolding done (magic will be demo-ed later)

#### Understanding MVC
![MVC](./img/mvc.png)

Model
- Represented by Active Record in RoR
- Active Record also known as ORM (Object Relational Mapping) - a wrapper that connects the rich objects of an application to tables in a relational database management system (RDMS). With ORM, you can retrieve and set values from the database without writing SQL statements

View
- Represented by Action View in RoR
- Responsible for displaying the value as readable html

Controller
- Represented by Action Controller in RoR
- Concerned with communicating with models and connecting database with view
- It makes the model data available to the view so it can display that data to the user, and it saves or updates user data to the model

### Setting up Rails API backend
Let's open up your terminal and run 
`rails new coffeeblog --api --database=postgresql`

This will create the code base of what we will use to run our API, and to tell Rails to configure a postgres database for this coffeeblog project.

You realise it automatically creates a git project!

For our offeeblog project, we will create an API to serve blog posts. This is a blog to share information for coffee lovers. Each post will be belong to one author and one author can write many posts. Each post can have many comments while each comment can only belong to one post. 


#### Rails Structure
| File/Folder | Purpose |
| - | - |
| app/ | Contains the controllers, models, views, helpers, mailers, jobs |
| config | Configure your application's routes, database, and more |
| db | Contains your current database schema, as well as the database migrations |
| Gemfile | Stores gem dependencies, used by Bundler |
| test/ | Contains test files |

We will focus more on the app and db folders.

Now, we will create the models and db migrations.

#### Generating Scaffolds
Given the above scenario, we will want to create a model for Author, Post, Comment. Let's assume for the authors table that we want to keep a record of their name (which is a string) and their favourite coffee brand (also string).

Here's an example of how RoR scaffolds the generation of a model.

```
rails g scaffold Author name:string favourite_coffee:string
```

Tip: g stands for generate. Ya programmers lazy ¯\\_ (ツ)_/¯

#### Ok what just happened?
Essentially, running one line generated my model, migration and controller!
![AMAHZING](https://media.giphy.com/media/3o7btYRcGPDrQ0YTy8/giphy.gif)
1. Invoked Active Record (Model)
 - Created a migration file `db/migrate/.....`
 - Created a Model file `app/models/author.rb`
2. Invoked Tests (model + controller)
3. Invoked Resource Route
- Added routes (new, show, put, delete)
4. Invoked Active Controller
- Created a controller file `app/controllers/authors_controller.rb`

#### Migration
Let's talk about migration. 

But first let's run the db migration. 
```bash
# create the postgres database first
rails db:create

# migrate
rails db:migrate
```
A migration reads migration files in `db/migrate` and carries out the action on the actual database . You realise the `db/schema.rb` file is created. Timestamps are auto created. This schema is important as it represents a snapshot of the table attributes and relationships between different tables in your database. Hence, the changes you make (new tables, new columns etc) that is written in the migration files won't be executed/applied on your db until you run the migration command.

#### Specifying Relationships
**TODO**: Create a scaffold for the Post model with a title and content attribute.

We know that each post belongs to one unique author while an author can have many posts. Let's formalize this in code.

Before we migrate and create the new post model, add this line to `db/migrate/...create_posts.rb` (before t.timestamps)
```
t.belongs_to :author, index: true, foreign_key: true
```
This tells postgres to create the foreign key column in the posts table. 

Thereafter, we also need to update the models to reflect this change.
```ruby
# app/models/author.rb
class Author < ApplicationRecord
  has_many :posts
end

# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :author
end
```

### TODO
Now for soome homework:
1. [ ] Create scaffold for Comment model (comment - string, thumbs_up - integer)
2. [ ] Post has many comments and comments belong to post. Add this relationship to the migration file and two the Post and Comment model files
3. [ ] Run the migration on the db

Tip: Refer to source code to verify that what you wrote is correct! 

Tip Again: You should not edit the migration file after you have migrated. You should run `rails db:rollback` to undo the db changes, then edit the file and run the migration again. 

### Conclusion

From lesson 1, we learnt:
1. MVC framework
2. How to create models
3. How to create and update tables in Postgresql database through migration files

Lesson two - we'll dive into Rails controller!

### References
1. [Getting Started](https://guides.rubyonrails.org/getting_started.html) 
2. [API only](https://edgeguides.rubyonrails.org/api_app.html)