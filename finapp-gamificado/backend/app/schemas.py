from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field as PydField

# Auth
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    sub: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str

class UserRead(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    created_at: datetime

    class Config:
        from_attributes = True

# Transactions
class TransactionBase(BaseModel):
    type: str
    category: str
    amount: float
    date: date
    note: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionRead(TransactionBase):
    id: int

    class Config:
        from_attributes = True

# Goals
class GoalCreate(BaseModel):
    title: str
    target_amount: float
    deadline: Optional[date] = None

class GoalRead(BaseModel):
    id: int
    title: str
    target_amount: float
    current_amount: float
    deadline: Optional[date] = None
    created_at: datetime

    class Config:
        from_attributes = True
