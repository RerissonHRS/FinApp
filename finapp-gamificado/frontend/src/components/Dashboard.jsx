import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Dashboard({ summary }){
  const data = [
    { name: 'Receitas', value: summary.income || 0 },
    { name: 'Despesas', value: summary.expense || 0 },
    { name: 'Saldo', value: summary.balance || 0 },
  ]
  return (
    <div>
      <h3 style={{marginTop:0}}>Resumo</h3>
      <div className="row" style={{marginBottom:12}}>
        <div className="kpi"><span className="tag">Receitas</span><strong>R$ {(summary.income||0).toFixed(2)}</strong></div>
        <div className="kpi"><span className="tag">Despesas</span><strong>R$ {(summary.expense||0).toFixed(2)}</strong></div>
        <div className="kpi"><span className="tag">Saldo</span><strong>R$ {(summary.balance||0).toFixed(2)}</strong></div>
      </div>
      <div style={{height:260}}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.8}/>
                <stop offset="95%" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
