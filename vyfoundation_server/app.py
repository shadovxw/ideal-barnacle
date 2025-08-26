from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, mail
from routes.users import users_bp
from routes.subscription import subscriptions_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:3000"])

# init extensions
db.init_app(app)
mail.init_app(app)

# register routes
app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(subscriptions_bp, url_prefix="/subscriptions")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
