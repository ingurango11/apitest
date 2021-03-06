# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160517164644) do

  create_table "grades", force: :cascade do |t|
    t.integer  "value"
    t.string   "period"
    t.integer  "graduate_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "grades", ["graduate_id"], name: "index_grades_on_graduate_id"

  create_table "graduates", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "cohort"
    t.string   "current_job"
    t.text     "bio"
    t.text     "news"
    t.string   "website"
    t.string   "picture"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
