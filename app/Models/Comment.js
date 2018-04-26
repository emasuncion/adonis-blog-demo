'use strict'

const Model = use('Model')

class Comment extends Model {
  static get hidden () {
    return ['password']
  }

  static get dates () {
    return super.dates.concat(['created_at'])
  }

  static formatDates(field, value) {
    if (field === 'created_at') {
      // return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }

  static castDates(field, value) {
    if (field === 'created_at') {
      return `${value.fromNow(true)} ago`
    }
    return super.formatDates(field, value)
  }

  post () {
    return this.belongsTo('App/Models/Post')
  }

  author () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
