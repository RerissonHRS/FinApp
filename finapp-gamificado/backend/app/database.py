from sqlmodel import SQLModel, create_engine, Session
from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    SECRET_KEY: str = "change_this_secret_key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./finapp.db"

    class Config:
        env_file = ".env"

settings = Settings()

# SQLite needs check_same_thread=False
connect_args = {"check_same_thread": False} if settings.SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(settings.SQLALCHEMY_DATABASE_URL, echo=False, connect_args=connect_args)

def init_db() -> None:
    from . import models  # ensure models are imported
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
