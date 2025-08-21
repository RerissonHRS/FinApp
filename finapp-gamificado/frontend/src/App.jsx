import React, { useEffect, useState } from 'react'
import { api, setAuth, getToken } from './api'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import Dashboard from './components/Dashboard'
import ChallengeCard from './components/ChallengeCard'
import GoalCard from './components/GoalCard'

export default function App() {
  const [user, setUser] = useState(null)
  const [summary, setSummary] = useState({income:0, expense:0, balance:0})
  const [transactions, setTransactions] = useState([])
  const [goals, setGoals] = useState([])
  const [challenge, setChallenge] = useState(null)

  async function refresh() {
    if (!getToken()) return
    const [tx, sum, gls, ch] = await Promise.all([
      api.get('/api/transactions/'),
      api.get('/api/transactions/summary'),
      api.get('/api/goals/'),
      api.get('/api/challenges/weekly'),
    ])
    setTransactions(tx.data)
    setSummary(sum.data)
    setGoals(gls.data)
    setChallenge(ch.data.challenge)
  }

  useEffect(() => { if (getToken()) refresh() }, [])

  if (!getToken()) {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="card" style={{flex:1}}>
            <Login onLogged={(u)=>{ setUser(u); refresh(); }} />
          </div>
          <div className="card" style={{flex:1}}>
            <Register onRegistered={()=>{}} />
          </div>
        </div>
        <p className="muted">Defina a variável de ambiente <span className="tag">VITE_API_URL</span> caso o backend não esteja em localhost:8000.</p>
      </div>
    )
  }

  return (
    <div className="container">
      <Header logged onLogout={()=>{ setAuth(null); setUser(null); window.location.reload(); }} />
      <div className="grid">
        <div className="col-8">
          <div className="card" style={{marginBottom:16}}>
            <Dashboard summary={summary} />
          </div>
          <div className="card" style={{marginBottom:16}}>
            <AddTransaction onAdded={refresh} />
          </div>
          <div className="card">
            <TransactionList items={transactions} onChanged={refresh} />
          </div>
        </div>
        <div className="col-4">
          <div className="card" style={{marginBottom:16}}>
            <GoalCard goals={goals} onChanged={refresh} />
          </div>
          <div className="card">
            <ChallengeCard challenge={challenge} />
          </div>
        </div>
      </div>
    </div>
  )
}
