const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const DB_PATH = path.join(__dirname, '../data/db.json')
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))

// GET /api/transactions — get logged in user transactions
router.get('/', protect, (req, res) => {
  const db = readDB()
  const userTransactions = db.transactions.filter(
    (t) => t.userId === req.user.id
  )
  res.json(userTransactions)
})

// GET /api/transactions/all — admin gets all transactions
router.get('/all', protect, adminOnly, (req, res) => {
  const db = readDB()
  res.json(db.transactions)
})

// POST /api/transactions — add new transaction
router.post('/', protect, (req, res) => {
  const { title, amount, type, category, date } = req.body

  if (!title || !amount || !type || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const db = readDB()

  const newTransaction = {
    id: db.transactions.length + 1,
    title,
    amount: parseFloat(amount),
    type,
    category,
    date,
    userId: req.user.id,
  }

  db.transactions.push(newTransaction)
  writeDB(db)

  res.status(201).json(newTransaction)
})

// PUT /api/transactions/:id — edit transaction
router.put('/:id', protect, (req, res) => {
  const db = readDB()
  const index = db.transactions.findIndex(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id
  )

  if (index === -1) {
    return res.status(404).json({ message: 'Transaction not found' })
  }

  db.transactions[index] = {
    ...db.transactions[index],
    ...req.body,
    id: db.transactions[index].id,
    userId: req.user.id,
  }

  writeDB(db)
  res.json(db.transactions[index])
})

// DELETE /api/transactions/:id — delete transaction
router.delete('/:id', protect, (req, res) => {
  const db = readDB()
  const index = db.transactions.findIndex(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id
  )

  if (index === -1) {
    return res.status(404).json({ message: 'Transaction not found' })
  }

  db.transactions.splice(index, 1)
  writeDB(db)

  res.json({ message: 'Transaction deleted successfully' })
})

module.exports = router