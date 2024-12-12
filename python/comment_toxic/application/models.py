import base64

from sqlalchemy import LargeBinary

from database import db

class Comment(db.Model):
    __tablename__ = 'Comments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    productId = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text('long'), nullable=False)
    image = db.Column(LargeBinary, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    star = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "content": self.content,
            "image": base64.b64encode(self.image).decode('utf-8') if self.image else None,
            "userId": self.userId,
            "star": self.star,
            "created_at": self.createdAt,
            "updated_at": self.updatedAt,
        }
