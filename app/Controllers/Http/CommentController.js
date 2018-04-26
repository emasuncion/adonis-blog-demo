'use strict'

const Comment = use('App/Models/Comment')
const { validateAll } = use('Validator')

class CommentController {
  async store ({ session, request, response, params, auth }) {
    let data = request.only(['content'])
    data.user_id = auth.user.id
    data.post_id = params.id


    const validation = await validateAll(data, {
      content: 'required|max:500'
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Comment.create(data)

    return response.redirect('back')
  }
}

module.exports = CommentController
