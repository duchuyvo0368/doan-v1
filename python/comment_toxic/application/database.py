from flask_sqlalchemy import  SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:@localhost:3306/ecom2"  # Lấy URL từ tệp .env
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
