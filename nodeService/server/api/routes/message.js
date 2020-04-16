const Router = require('koa-router');

require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const {
  sendMessage,
  getUsers,
  getMessages
} = require('../../db/queries/message');

const messageRouter = new Router({ prefix: '/message' });

// Send message
messageRouter.post('/:id_sender/:id_recipient', async (ctx) => {
  const { id_sender, id_recipient } = ctx.params
  const { text } = ctx.request.body
  await sendMessage(id_sender, id_recipient, text)
    .then(() => {
      ctx.body = 'Message sent!';
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// Get a all users that an account has messaged
messageRouter.get('/users/:id', async (ctx) => {
  const { id } = ctx.params

  await getUsers(id)
    .then((users) => {
      console.log('Successfully got messaged users');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// Get all messages between 2 users
messageRouter.get('/:id_sender/:id_recipient', async (ctx) => {
  const { id_sender, id_recipient } = ctx.params
  await getMessages(id_sender, id_recipient)
    .then((messages) => {
      ctx.body = messages;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// Twilio Route
messageRouter.post('/twilio', async (ctx) => {
  console.log('twilio');
  ctx.set('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: ctx.request.body.to,
      body: ctx.request.body.body
    })
    .then(() => {
      ctx.body = { success: true }
    })
    .catch(err => {
      console.log(err);
      ctx.body = { success: false };
    });
});

module.exports.messageRouter = messageRouter;
