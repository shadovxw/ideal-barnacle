from datetime import datetime
from extensions import db

class SerializerMixin:
    """Reusable mixin to serialize SQLAlchemy models to dict"""
    def to_dict(self):
        result = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            # convert datetime objects to ISO string
            if isinstance(value, datetime):
                value = value.isoformat()
            result[column.name] = value
        return result


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False)
    mobile = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(255))
    amount = db.Column(db.String(50))
    donation_type = db.Column(db.String(100))
    newsletter = db.Column(db.Boolean)
    events_update = db.Column(db.Boolean)
    donation_made = db.Column(db.String(100))
    details = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Subscription(db.Model, SerializerMixin):
    __tablename__ = "subscriptions"
    id = db.Column(db.Integer, primary_key=True)
    email_id = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
