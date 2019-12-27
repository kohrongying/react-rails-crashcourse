## Welcome to Lesson 2

### What we're going to achieve
- Configure controllers to make API requests to endpoints

### Action Controller
Now that the models are set up, let's talk about the controller. The most important file you must know:

> `config/routes.rb`

This shows us what routes are available when the server is running.

Open the file and you will see some resources are being defined. Open up the files under `app/controllers/` and OMG did the code write itself?

![OMG](https://media.giphy.com/media/ZdCJ4G17h7lIsrYfLs/giphy.gif)

Yes, it was generated when we ran the scaffold in the previous lesson. Our job is done!

### Rails Server
Let's run a server:
```
rails s
```

Navigate to your browser, and open up `localhost:3000`. 

Navigate to `localhost:3000/authors`. You should see `[]`

YAY congrats. You have just learnt RoR lol. 

![Done](https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif)

#### What went down
Ok now to explain - when you navigate to the route `/authors`, what you actually did was to call the index method in the authors controller. How do I know this? I look at `routes.rb`.

`resources :authors` is actually short-form (or ruby sugar for):
```
get '/authors', to: 'authors#index', as: 'authors'
get '/authors/:id', to: 'authors#show', as: 'author'
post '/authors', to: 'authors#create', as: 'authors_new'
put '/authors/:id', to: 'authors#update', as: 'authors_update'
delete '/authors/:id', to: 'authors#destroy', as: 'authors_delete'
```

There are five main methods. Respectively, in order:
1. `index` method is to return all the records in that table
2. `show` method is to return the specified record (given id)
3. `create` method is to create a new record in table
3. `update` method is to update specified record (given id)
5. `destroy` method is to destroy specified record (given id)

So the empty array we see, is actually the result of displaying all the authors in the database. That is what the index method is saying. Return all authors.

We can add on methods to the controller. But once we add the method, we have to tell Rails the existence of this new method - through the `routes.rb` file. 

#### Creating a new route
Breaking down the syntax of 
```ruby
get '/authors', to: 'authors#index', as: 'authors'
```
1. `get` - RESTful API method call
2. `/authors` - Endpoint
3. `to: 'authors#index` - Specifies which method in which controller to execute
4. `as: 'authors'` - Name of the route


Ok it's time to see some real data. Let's add an author. Let's do it via the console.

### Using Rails Console

What we're going to do is use the ORM syntax to create a record in the authors table.

```ruby
# Starts a console
rails c

> Author.create(name: "01", 
  favourite_coffee: "Kopi Siew Dai")
```

Refresh the page at `localhost:3000/authors` endpoint. What do you see???

### Seeding the db with data
Seeding the db is to populate the db with some initial data. This facilitates dev work.

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

### A little more about ActiveRecord
The ruby syntax makes it easy to build queries.

| Rails | SQL | Command |
| - | - | - |
| Model.all | SELECT * FROM model; | Get all records |
| Model.find(:id) | SELECT * FROM model WHERE model.id = id; | Get record of id |
| Model.pluck(:name) | SELECT name FROM model; | Get all names from model table | 
| Model.find(:id).association | SELECT * FROM model INNER JOIN association_table ON model.col_name = association_table.col_name; | Getting assocations of a record |
| Model.where(name: ...) | SELECT * FROM model WHERE name = ...; | Get records where... |

### Conclusion

From lesson 2, we learnt:

1. How routing and RESTful API calls work in RoR
2. How to seed data
3. Active Record queries

Lesson 3 - we'll dive into frontend!


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

# Show what routes are available
rails routes

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