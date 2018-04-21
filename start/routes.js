'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', 'PostController.index')

// Those routes should be only accessible
// when you are not logged in
Route.group(() => {
  Route.get('login', 'SessionController.create')
  Route.post('login', 'SessionController.store')

  Route.get('register', 'UserController.create')
  Route.post('register', 'UserController.store')
}).middleware(['guest'])

// Those routes should be only accessible
// when you are logged in
Route.group(() => {
  Route.get('logout', 'SessionController.delete')

  Route.get('posts/create', 'PostController.create')
  Route.post('posts', 'PostController.store')
  Route.get('posts/:id/edit', 'PostController.edit')
  Route.get('posts/:id/delete', 'PostController.delete')
  Route.put('posts/:id', 'PostController.update')

  Route.get('posts/:id/show', 'PostController.showPost')

  // Route.get('posts/:id/show', async ({ view, params }) => {
  //   return params
  // })

  Route.post('posts/:id/comments', 'CommentController.store')
}).middleware(['auth'])
