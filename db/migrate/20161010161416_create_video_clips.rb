class CreateVideoClips < ActiveRecord::Migration[5.0]
  def change
    create_table :video_clips do |t|
      t.references :video, foreign_key: true
      t.string :name
      t.string :start
      t.string :end
    end
  end
end
