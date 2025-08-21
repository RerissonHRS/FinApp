from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import Goal, User
from ..schemas import GoalCreate, GoalRead
from ..auth import get_current_user

router = APIRouter(prefix="/api/goals", tags=["goals"])

@router.post("/", response_model=GoalRead)
def create_goal(data: GoalCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    goal = Goal(user_id=user.id, **data.model_dump())
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return goal

@router.get("/", response_model=List[GoalRead])
def list_goals(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    q = select(Goal).where(Goal.user_id == user.id).order_by(Goal.created_at.desc())
    return session.exec(q).all()

@router.post("/{goal_id}/deposit")
def deposit_goal(goal_id: int, amount: float, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    goal.current_amount += amount
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return {"ok": True, "current_amount": goal.current_amount}
