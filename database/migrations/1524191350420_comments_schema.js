'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.text('content')
      table.timestamps('created_at')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id')
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('post_id').unsigned().notNullable()
      table.foreign('post_id')
      .references('id').inTable('posts')
      .onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
