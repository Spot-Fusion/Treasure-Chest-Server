const { pool } = require('../connection');

const sendMessage = (id_sender, id_recipient, text) => {
  const query = `
  INSERT INTO 
  "message" (id_sender, id_recipient, text)
  VALUES($1, $2, $3);`;
  return pool.query(query, [id_sender, id_recipient, text]);
};

const getUsers = (id) => {
  const query = `
  WITH m_u AS
    (
      SELECT account.name, account.icon, message.text, id_sender, message.created_at as last_sent_at
      FROM "message", "account"
      WHERE message.id_sender = $1
      AND message.id_recipient = account.id
      UNION
      SELECT account.name, account.icon, message.text, id_sender, message.created_at as last_sent_at
      FROM "message", "account"
      WHERE message.id_recipient = $1
      AND message.id_sender = account.id
    )
  SELECT * FROM m_u
  WHERE last_sent_at = (SELECT MAX(last_sent_at) FROM m_u t WHERE m_u.name = t.name)
  ORDER BY last_sent_at DESC`;
  return pool.query(query, [id])
    .then((users) => users.rows);
};

const getMessages = (id_sender, id_recipient) => {
  query = `
    Select * FROM
      (
        SELECT message.id AS id_message, account.id AS id_user, message.created_at, account.name, message.text
        FROM message
        INNER JOIN account
        ON account.id = message.id_sender
        WHERE message.id_recipient = $1 AND message.id_sender = $2
        OR message.id_sender = $1 AND message.id_recipient = $2
      )
    AS all_messages
    ORDER BY created_at DESC;`;
  return pool.query(query, [id_sender, id_recipient])
    .then((messages) => messages.rows);
}

module.exports = {
  sendMessage,
  getUsers,
  getMessages,
}