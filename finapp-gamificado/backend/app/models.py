from typing import Optional
from datetime import datetime, date
from sqlmodel import SQLModel, Field, Relationship

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    full_name: str
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    transactions: list["Transaction"] = Relationship(back_populates="user")
    goals: list["Goal"] = Relationship(back_populates="user")

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    type: str  # 'income' | 'expense'
    category: str
    amount: float
    date: date = Field(default_factory=date.today)
    note: Optional[str] = None

    user: Optional[User] = Relationship(back_populates="transactions")

class Goal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    title: str
    target_amount: float
    current_amount: float = 0.0
    deadline: Optional[date] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="goals")
