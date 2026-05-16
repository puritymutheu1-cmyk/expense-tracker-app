import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(transactionData),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updates),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data.message)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTransactionError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload)
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        )
        if (index !== -1) state.transactions[index] = action.payload
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        )
      })
  },
})

export const { clearTransactionError } = transactionSlice.actions
export default transactionSlice.reducer