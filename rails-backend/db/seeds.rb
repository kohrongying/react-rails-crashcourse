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