from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Index,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Breed(Base):
    __tablename__ = "breeds"  # @@map("breeds")

    id = Column(Integer, primary_key=True)
    breed = Column(String, unique=True, nullable=False)

    images = relationship(
        "BreedImage", back_populates="breed_rel", cascade="all, delete-orphan"
    )


class BreedImage(Base):
    __tablename__ = "breed_images"

    id = Column(Integer, primary_key=True)
    breed_id = Column(
        Integer,
        ForeignKey("breeds.id", ondelete="CASCADE"),
        nullable=False,
    )

    # можно хранить и URL, и локальный путь
    url = Column(String, nullable=True)
    path = Column(String, nullable=False)

    breed_rel = relationship("Breed", back_populates="images")

    __table_args__ = (Index("idx_breed_images_breed_id", "breed_id"),)
