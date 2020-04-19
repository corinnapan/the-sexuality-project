class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest

      t.timestamps #default that we get in every table
    end
  end
end
#we never have to write our SQL tables
#ActiveRecord is an ORM that'll take our Ruby code --> SQL and back. Python, JS, Ruby have string, array, key-value pairs; don't have data type tables unlike SQL. incompatible data types. Active Record gets data from table and converts it into a way that we can then use Record. It converts data and gives us helper methods like .find, .save, .where

#model represents the data from table, migration creates the table for that model 
#rails g model makes a model and a migration, scaffold creates the model and migration but also creates controller and route 


