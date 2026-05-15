const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const DB_PATH = path.join(__dirname, '../data/db.json')
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))

// GET /api/users — admin gets all users
router.get('/', protect, adminOnly, (req, res) => {
  const db = readDB()
  const users = db.users.map(({ password, ...user }) => user)
  res.json(users)
})

// DELETE /api/users/:id — admin deletes a user
router.delete('/:id', protect, adminOnly, (req, res) => {
  const db = readDB()
  const index = db.users.findIndex((u) => u.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' })
  }

  db.users.splice(index, 1)
  writeDB(db)

  res.json({ message: 'User deleted successfully' })
})

module.exports = router