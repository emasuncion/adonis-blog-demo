'use strict'

const Model = use('Model')

class Comment extends Model {
  post () {
    return this.belongsTo('App/Models/Post', 'post_id')
  }
}

module.exports = Comment
