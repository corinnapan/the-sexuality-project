class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.references :user, null: false, foreign_key: true #it's going to get a foreign key (get id of user that this post belongs to) serial primary key vs foreign key (id of associated table)

      t.timestamps
    end
  end
end
