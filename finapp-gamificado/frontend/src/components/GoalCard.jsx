import React, { useState } from 'react'
import { api } from '../api'

export default function GoalCard({ goals, onChanged }){
  const [title, setTitle] = useState('Reserva de emergência')
  const [target, setTarget] = useState('1000')
  const [deadline, setDeadline] = useState(null)

  const create = async (e)=>{
    e.preventDefault()
    await api.post('/api/goals/', { title, target_amount: Number(target), deadline: deadline || null })
    onChanged && onChanged()
  }

  const deposit = async (id)=>{
    const amount = Number(prompt('Valor do depósito:') || '0')
    if (!amount) return
    await api.post(`/api/goals/${id}/deposit`, null, { params: { amount } })
    onChanged && onChanged()
  }

  return (
    <div>
      <h3 style={{marginTop:0}}>Metas</h3>
      <div>
        {goals.length===0 && <p className="muted">Sem metas ainda.</p>}
        {goals.map(g => (
          <div key={g.id} style={{borderBottom:'1px solid #1f2937', padding:'8px 0'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <strong>{g.title}</strong>
              <button className="btn" onClick={()=>deposit(g.id)}>Depositar</button>
            </div>
            <p className="muted">R$ {g.current_amount.toFixed(2)} de R$ {g.target_amount.toFixed(2)} {g.deadline ? `• até ${g.deadline}` : ''}</p>
            <div style={{height:8, background:'#0b1222', border:'1px solid #1f2937', borderRadius:999}}>
              <div style={{height:'100%', width: `${Math.min(100, (g.current_amount/g.target_amount)*100)}%`, background:'#60a5fa', borderRadius:999}} />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={create} className="row" style={{marginTop:12}}>
        <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Valor alvo" type="number" value={target} onChange={e=>setTarget(e.target.value)} />
        <input type="date" value={deadline||''} onChange={e=>setDeadline(e.target.value)} />
        <button className="btn">Nova meta</button>
      </form>
    </div>
  )
}
