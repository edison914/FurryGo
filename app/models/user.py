from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    nickname = db.Column(db.String(40), nullable=False)
    # profile_url = db.Column(db.String(255), nullable=False)

    #a user can have many spots
    spots = db.relationship('Spot', back_populates='user', cascade='all, delete')

    #a user can have many comments
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    #a user can have many ratings
    ratings = db.relationship(
        "Rating", back_populates="user", cascade="all, delete"
    )

    #a user can have many bookmarks
    bookmarks = db.relationship("Bookmark", back_populates="user", cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'nickname': self.nickname,
            # 'profile_url': self.profile_url
        }
