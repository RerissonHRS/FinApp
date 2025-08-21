import React from 'react'

export default function Header({ logged=false, onLogout }){
  return (
    <header>
      <h1>💸 FinApp Gamificado</h1>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <span className="tag">MVP</span>
        {logged && <button className="btn" onClick={onLogout}>Sair</button>}
      </div>
    </header>
  )
}
