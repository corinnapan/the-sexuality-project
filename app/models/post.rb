class Post < ApplicationRecord
  belongs_to :user #bc we added user: references. 
  has_many :comments
end
