const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect();


// Get single subreddit
router.get("/:name", (req, res) => {
  try {

    console.log(req.params.name)

    const getSingleSubredditStatement = `
      SELECT * FROM subreddits
      WHERE name = '${req.params.name}'
    `

    console.log(getSingleSubredditStatement)

    connection.query(getSingleSubredditStatement, (err, rows) => {
      if(err) throw err

      console.log(rows)
      
      res.send(rows[0])
    })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})


// Get all subreddits
router.get("/", (req, res) => {
  try{
    connection.query('SELECT * FROM subreddits', (err, rows) => {
      res.send(rows)
    })
  } catch (e) {
    console.log("ERRORRRRRR")
    res.status(400).send({ error: e.message })
  }
})


// Create subreddit
router.post("/", (req, res) => {
  try {

    const insertSubredditStatement = `
    INSERT INTO subreddits 
    (user_id, name, description) 
    VALUES (${req.body.userId}, '${req.body.name}', '${req.body.description}')`

    connection.query(insertSubredditStatement, (err, results) => {
      if(err) throw err

      res.send({ idForNewSubreddit: results.insertId })
    })

  } catch (e) {
    res.status(400).send({ error: 'A subreddit with this name already exists' })
  }
})

// Delete subreddit
router.delete('/:subredditId/:userId', (req, res) => {

  const { subredditId, userId } = req.params

  try {

    const deleteSubredditStatement = `
      DELETE s.*, p, c, pv, cv
      FROM subreddits AS s
      LEFT JOIN posts p ON p.subreddit_id = s.id
      LEFT JOIN comments c ON c.post_id = p.id
      LEFT JOIN post_votes pv ON pv.post_id = p.id
      LEFT JOIN comment_votes cv ON cv.comment_id = c.id
      WHERE s.user_id = ${userId} AND s.id = ${subredditId}
    `

    connection.query(deleteSubredditStatement, (err, results) => {
      if(err) throw err
      res.send(results)
    })
    
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router