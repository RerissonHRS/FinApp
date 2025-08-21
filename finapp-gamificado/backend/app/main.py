from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .auth import router as auth_router
from .routers.transactions import router as tx_router
from .routers.goals import router as goals_router
from .routers.challenges import router as challenges_router

app = FastAPI(title="FinApp Gamificado", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth_router)
app.include_router(tx_router)
app.include_router(goals_router)
app.include_router(challenges_router)

@app.get("/")
def root():
    return {"message": "FinApp Gamificado API is running"}
