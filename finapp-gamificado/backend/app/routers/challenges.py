from fastapi import APIRouter, Depends
from sqlmodel import Session
from datetime import date
from ..database import get_session
from ..auth import get_current_user
from ..models import User

router = APIRouter(prefix="/api/challenges", tags=["challenges"])

# Simple weekly challenge suggestions based on date
@router.get("/weekly")
def weekly_challenge(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    week = date.today().isocalendar().week
    challenges = [
        {"title": "Corte um gasto supérfluo", "description": "Elimine um gasto recorrente pequeno (ex.: assinatura pouco usada).", "reward": 10},
        {"title": "Registre todos os gastos por 7 dias", "description": "Anote 100% dos gastos essa semana.", "reward": 15},
        {"title": "Desafio dos 10%", "description": "Economize 10% de toda renda recebida nesta semana.", "reward": 20},
        {"title": "Dia sem delivery", "description": "Prepare todas as refeições em casa por 3 dias seguidos.", "reward": 12},
    ]
    chosen = challenges[week % len(challenges)]
    return {"week": week, "challenge": chosen}
