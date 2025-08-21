# FinApp Gamificado (MVP)

App de **educação financeira gamificada** (MVP), com backend **FastAPI** e frontend **React + Vite**.

## ✨ Funcionalidades
- Autenticação (JWT) com login e cadastro.
- Lançamentos de **receitas/despesas**.
- **Resumo** (receitas, despesas, saldo).
- **Metas** com barra de progresso e depósitos.
- **Desafio da semana** com recompensa em pontos (simples).
- UI escura moderna (sem libs de UI para facilitar o start).

## 🧱 Stack
- Backend: FastAPI + SQLModel (SQLite por padrão).
- Frontend: React + Vite + Recharts.
- Auth: OAuth2 password flow + JWT.
- CORS liberado para dev.

---

## 🚀 Como rodar

### 1) Backend
```bash
cd backend
cp .env.example .env  # edite se quiser Postgres
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Endpoints úteis:
- `POST /api/auth/register` — cria usuário.
- `POST /api/auth/token` — login (form-data: username, password) → retorna JWT.
- `GET /api/transactions/` — listar lançamentos (Bearer token).
- `POST /api/transactions/` — criar lançamento.
- `GET /api/transactions/summary` — resumo.
- `DELETE /api/transactions/{id}` — excluir.
- `GET /api/goals/` — listar metas.
- `POST /api/goals/` — criar meta.
- `POST /api/goals/{id}/deposit?amount=100` — depositar.
- `GET /api/challenges/weekly` — desafio da semana.

Testar rapidamente no navegador: `http://localhost:8000/docs`

### 2) Frontend
```bash
cd frontend
npm i
# se o backend NÃO estiver em http://localhost:8000, crie .env.local com:
# VITE_API_URL=http://localhost:8000
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🧭 Roadmap próximo
- Gamificação completa (pontos, badges, ranking).
- Categorias personalizáveis e relatórios por período.
- Importar CSV (extrato) + dicas automáticas.
- Multi-idioma e acessibilidade (a11y).
- Deploy (Railway/Render + Vercel/Netlify).

---

## 📂 Estrutura
```
finapp-gamificado/
  backend/
    app/
      __init__.py
      main.py
      database.py
      models.py
      schemas.py
      auth.py
      routers/
        __init__.py
        transactions.py
        goals.py
        challenges.py
    .env.example
    requirements.txt
  frontend/
    index.html
    vite.config.js
    package.json
    src/
      main.jsx
      App.jsx
      api.js
      components/
        Header.jsx
        Login.jsx
        Register.jsx
        AddTransaction.jsx
        TransactionList.jsx
        Dashboard.jsx
        ChallengeCard.jsx
        GoalCard.jsx
```

---

## 🛡️ Segurança
- Troque o `SECRET_KEY` no `.env`.
- Em produção, use HTTPS e banco externo (Postgres).

Bom código! 💙
