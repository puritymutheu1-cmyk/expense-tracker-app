import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
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

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
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

export const fetchAllTransactions = createAsyncThunk(
  'admin/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions/all`, {
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

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    allTransactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.allTransactions = action.payload
      })
  },
})

export const { clearAdminError } = adminSlice.actions
export default adminSlice.reducer