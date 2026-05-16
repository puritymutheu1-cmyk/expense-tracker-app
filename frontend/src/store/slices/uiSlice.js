import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    activeTab: 'dashboard',
    loading: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setActiveTab, setLoading } = uiSlice.actions
export default uiSlice.reducer