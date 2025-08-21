from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func
from typing import List
from datetime import date

from ..database import get_session
from ..models import Transaction, User, Goal
from ..schemas import TransactionCreate, TransactionRead
from ..auth import get_current_user

router = APIRouter(prefix="/api/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionRead)
def create_transaction(data: TransactionCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    tx = Transaction(user_id=user.id, **data.model_dump())
    session.add(tx)
    session.commit()
    session.refresh(tx)
    return tx

@router.get("/", response_model=List[TransactionRead])
def list_transactions(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    q = select(Transaction).where(Transaction.user_id == user.id).order_by(Transaction.date.desc(), Transaction.id.desc())
    return session.exec(q).all()

@router.delete("/{tx_id}")
def delete_transaction(tx_id: int, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    tx = session.get(Transaction, tx_id)
    if not tx or tx.user_id != user.id:
        raise HTTPException(status_code=404, detail="Transaction not found")
    session.delete(tx)
    session.commit()
    return {"ok": True}

@router.get("/summary")
def summary(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    income = session.exec(select(func.sum(Transaction.amount)).where(Transaction.user_id==user.id, Transaction.type=="income")).one()
    expense = session.exec(select(func.sum(Transaction.amount)).where(Transaction.user_id==user.id, Transaction.type=="expense")).one()
    income = income or 0.0
    expense = expense or 0.0
    balance = (income or 0.0) - (expense or 0.0)
    # progress on goals (sum of current_amount vs target)
    goals = session.exec(select(Goal)).all()
    return {"income": float(income or 0.0), "expense": float(expense or 0.0), "balance": float(balance or 0.0)}
