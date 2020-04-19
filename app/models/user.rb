#User class in Ruby comes with a bunch of things by default (.destroy, .find, etc.)
#but we can add more methods

class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
  has_many :posts #active record knows now that these two things are associated. a user has posts and that a post belongs to a user
  has_many :comments
end

