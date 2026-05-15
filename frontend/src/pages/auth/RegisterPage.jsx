import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [localError, setLocalError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setLocalError('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) return setLocalError('Passwords do not match')
    if (formData.password.length < 6) return setLocalError('Password must be at least 6 characters')
    try {
      setLoading(true)
      await register(formData.name, formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
            <span className="text-2xl font-bold text-white tracking-tight">Spend<span className="text-emerald-400">Wise</span></span>
          </div>
          <p className="text-slate-400 text-sm">Create your free account</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Get started</h2>
          {localError && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{localError}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name',        name: 'name',            type: 'text',     placeholder: 'John Doe'          },
              { label: 'Email address',    name: 'email',           type: 'email',    placeholder: 'john@example.com'  },
              { label: 'Password',         name: 'password',        type: 'password', placeholder: 'Min 6 characters'  },
              { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Re-enter password' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
                <input type={type} name={name} value={formData[name]} onChange={handleChange}
                  placeholder={placeholder} required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-semibold rounded-xl transition-all duration-200 mt-2">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-6">
            Have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium ml-1">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}