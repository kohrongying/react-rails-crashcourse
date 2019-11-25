## Welcome to Lesson 1A

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
2. [ ] Add Post has many comments and comments belong to post relationship
2. [ ] Run the migrations on the db and see that the schema reflect the new model
3. [ ] Rmb to update model


### Controller
Now that the models are set up, let's talk about the controller. The most important file you must know:

> `config/routes.rb`

This exposes the routes that are available when the server is running.

Open the file and you will see some resources are being defined. Open up the files under `app/controllers/` and OMG did the code write itself?

![OMG](https://media.giphy.com/media/ZdCJ4G17h7lIsrYfLs/giphy.gif)

Yes, it was part of the scaffold. Our job is done!

Let's run a server:
```
rails s
```

Navigate to your browser, and open up `localhost:3000`. Navigate to `localhost:3000/authors`. You should see `[]`

YAY congrats. You have just learnt RoR lol. 

![Done](https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif)

Ok now to explain - when you navigate to the route `/authors`, what you actually did was to call the index method in the authors controller. How do I know this? I look at `routes.rb`.

`resources :authors` is actually short-form (or ruby sugar for):
```
get '/authors', to: 'authors#index', as: 'authors'
get '/authors/:id', to: 'authors#show', as: 'author'
post '/authors', to: 'authors#create', as: 'authors_new'
put '/authors/:id', to: 'authors#update', as: 'authors_update'
delete '/authors/:id', to: 'authors#destroy', as: 'authors_delete'
```

So the empty array is actually the result of displaying all the authors in the database. That is what the index method is saying. Return all authors. See the syntax of ActiveRecord? 
`Author.all` vs `SELECT * from authors;`

Ok let's add an author. Let's do it via the console.

### Using Rails Console

What we're going to do is use the ORM syntax to create a record in the authors table.

```ruby
Author.create(name: "01", 
  favourite_coffee: "Kopi Siew Dai")
```

Run the server at the `/authors` endpoint. What do you see???

### Seeding the db with data
Copy this into `db/seeds.rb`
```ruby
zeroone = Author.find_or_create_by(name: "01", 
  favourite_coffee: "Kopi Siew Dai")
kyli = Author.find_or_create_by(name: "Kyli", 
  favourite_coffee: "Choc Coffee")

post1 = Post.find_or_create_by(title: "Benefits of Coffee",
  content: "I Love coffee", author_id: zeroone.id)

post2 = Post.find_or_create_by(title: "You wouldn't believe # 3 about coffee",
  content: "Coffee has its secrets", author_id: kyli.id)

Comment.find_or_create_by(comment: "I'd die before going without coffee", 
  thumbs_up: 5, post_id: post1.id)
```

Run `rails db:seed` and the 5 records will be added to your database.

### Homework for the good kids
- [ ] Add a new endpoint to return all the posts belonging to one author

Tip: Peek at the source code in this repo to see the answer! 
### Conclusion

From lesson 1, we learnt:
1. MVC framework
2. How to create models, controllers and migrations
3. How routing and RESTful API calls work

Lesson two - we'll dive into frontend!


### A little more about ActiveRecord
The ruby syntax makes it easy to build queries.

| Rails | SQL | Command |
| - | - | - |
| Model.all | SELECT * FROM model; | Get all records |
| Model.find(:id) | SELECT * FROM model WHERE model.id = id; | Get record of id |
| Model.pluck(:name) | SELECT name FROM model; | Get all names from model table | 
| Model.find(:id).association | SELECT * FROM model INNER JOIN association_table ON model.col_name = association_table.col_name; | Getting assocations of a record |
| Model.where(name: ...) | SELECT * FROM model WHERE name = ...; | Get records where... |


### Rails Commands Cheatsheet
```ruby
# Starts a http server.
# s is short for server
rails s

# Starts a console
# c is short for console
rails c

# Create db if not created (run only at the start)
rails db:create

# Migrate db
rails db:migrate

# Create scaffolds
rails g scaffold <Model> <attribute>:<type>

# Create individual model/controller/etc
rails g model <Model>
rails g controller <Name>
rails g migration <Name>
```

### References
1. [Getting Started](https://guides.rubyonrails.org/getting_started.html) 
2. [API only](https://edgeguides.rubyonrails.org/api_app.html)