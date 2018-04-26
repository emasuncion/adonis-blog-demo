'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Comment')

trait('Auth/Client')
trait('Test/Browser')
trait('Session/Client')
trait('DatabaseTransactions')

test('we can write a comment', async ({ assert, browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And a generated post
  const post = await Factory.model('App/Models/Post').create()

  // And a generated comment
  const comment = await Factory.model('App/Models/Comment').make()

  // And we are logged on the post and to add a comment
  const page = await browser.visit(`/posts/${post.id}/show`, (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .type('[name="content"]', comment.content)
    .submitForm('form')
    .waitForNavigation()

  // We expect to be on the same page
  await page.assertPath(`/posts/${post.id}/show`)

  // and to see the title of our comment
  await page.assertHas(comment.content)
}).timeout(0)

test('a comment should have a content', async ({ assert, browser}) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And a generated post
  const post = await Factory.model('App/Models/Post').create()

  // And no generated comment

  // And we are logged on the post and to add a comment
  const page = await browser.visit(`/posts/${post.id}/show`, (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .type('[name="content"]')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be on the same page
  await page.assertPath(`/posts/${post.id}/show`)
}).timeout(0)
