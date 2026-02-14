from typing import Optional
import pydantic
from abc import ABC

class AbstractUser (pydantic.BaseModel, ABC):
    name: str
    password: str
    
    @classmethod
    @pydantic.field_validator("password")
    def secure_password(cls, v: str):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return v


class CreateUser (AbstractUser):
    name: str
    password: str
class UpdateUser (AbstractUser):
    name: Optional[str]
    password: Optional[str]