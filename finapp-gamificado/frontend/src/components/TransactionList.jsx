import React from 'react'
import { api } from '../api'

export default function TransactionList({ items, onChanged }){
  const removeItem = async (id)=>{
    await api.delete(`/api/transactions/${id}`)
    onChanged && onChanged()
  }

  return (
    <div>
      <h3 style={{marginTop:0}}>Lançamentos</h3>
      <div>
        {items.length===0 && <p className="muted">Sem lançamentos ainda.</p>}
        {items.map(tx => (
          <div key={tx.id} className="row" style={{alignItems:'center', borderBottom:'1px solid #1f2937', padding:'8px 0'}}>
            <div style={{flex:2}}>{tx.date}</div>
            <div style={{flex:3}}>{tx.category}</div>
            <div style={{flex:2}}>{tx.type === 'income' ? 'Receita' : 'Despesa'}</div>
            <div style={{flex:2}}>R$ {tx.amount.toFixed(2)}</div>
            <div style={{flex:3}} className="muted">{tx.note}</div>
            <div style={{flex:1, textAlign:'right'}}>
              <button className="btn" onClick={()=>removeItem(tx.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
