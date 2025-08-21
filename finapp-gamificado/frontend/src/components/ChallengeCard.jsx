import React from 'react'

export default function ChallengeCard({ challenge }){
  if (!challenge) return <p className="muted">Carregando desafio...</p>
  return (
    <div>
      <h3 style={{marginTop:0}}>Desafio da Semana</h3>
      <p style={{margin:'8px 0'}}><strong>{challenge.title}</strong></p>
      <p className="muted">{challenge.description}</p>
      <span className="tag">⭐ {challenge.reward} pontos</span>
    </div>
  )
}
