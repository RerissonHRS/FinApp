import React, { useState } from 'react'
import { api } from '../api'

export default function Register({ onRegistered }){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const payload = { email, full_name: name, password }
    await api.post('/api/auth/register', payload)
    setDone(true)
    onRegistered && onRegistered()
  }

  if (done) return <p className="muted">Cadastro realizado! Agora faça login ao lado.</p>

  return (
    <div>
      <h2 style={{marginTop:0}}>Criar conta</h2>
      <form onSubmit={submit} className="row">
        <input placeholder="Nome completo" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  )
}
