from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://postgres:123@localhost:5432/dog-breeds")
SessionLocal = sessionmaker(bind=engine)
