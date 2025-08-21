import React, { useState } from 'react'
import { api } from '../api'

export default function AddTransaction({ onAdded }){
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Alimentação')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [note, setNote] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    const payload = { type, category, amount: Number(amount), date, note }
    await api.post('/api/transactions/', payload)
    setAmount(''); setNote('')
    onAdded && onAdded()
  }

  return (
    <div>
      <h3 style={{marginTop:0}}>Adicionar lançamento</h3>
      <form onSubmit={submit} className="row">
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="expense">Despesa</option>
          <option value="income">Receita</option>
        </select>
        <input placeholder="Categoria" value={category} onChange={e=>setCategory(e.target.value)} />
        <input placeholder="Valor" type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input placeholder="Observação (opcional)" value={note} onChange={e=>setNote(e.target.value)} />
        <button className="btn">Salvar</button>
      </form>
    </div>
  )
}
