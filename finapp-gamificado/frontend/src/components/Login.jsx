import React, { useState } from 'react'
import { api, setAuth } from '../api'

export default function Login({ onLogged }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const form = new URLSearchParams()
      form.append('username', email)
      form.append('password', password)
      const { data } = await api.post('/api/auth/token', form, { headers: {'Content-Type':'application/x-www-form-urlencoded'}})
      setAuth(data.access_token)
      onLogged && onLogged({ email })
    } catch (err) {
      setError('Credenciais inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{marginTop:0}}>Entrar</h2>
      <form onSubmit={submit} className="row">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" disabled={loading}>{loading?'Entrando...':'Entrar'}</button>
      </form>
      {error && <p className="muted">{error}</p>}
    </div>
  )
}
