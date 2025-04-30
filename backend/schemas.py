from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models import PriorityLevel

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[PriorityLevel] = PriorityLevel.MEDIUM

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    category: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[PriorityLevel] = None

class Todo(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    todos: List[Todo] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 