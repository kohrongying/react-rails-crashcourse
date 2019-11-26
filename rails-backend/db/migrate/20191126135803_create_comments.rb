class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :comment
      t.integer :thumbs_up
      t.belongs_to :post, index: true, foreign_key: true
      t.timestamps
    end
  end
end
