class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
end


#our database has 3 tables - comments, posts, and users