from flask import Blueprint, request, jsonify
from flask_mail import Message
from extensions import db, mail  
from db import Subscription

subscriptions_bp = Blueprint("subscriptions", __name__)

@subscriptions_bp.route("/createsubscription", methods=["POST"])
def create_subscription():
    data = request.json
    new_sub = Subscription(**data)
    db.session.add(new_sub)
    db.session.commit()

    try:
        msg = Message(
            subject="VY FOUNDATION",
            recipients=[new_sub.email_id],
            body="Thank you for subscribing to updates from VY Foundation. We’re excited to have you!"
        )
        mail.send(msg)
        return jsonify(success=True, message="Subscription saved and email sent")
    except Exception as e:
        return jsonify(success=False, message="Subscription saved but email failed", error=str(e))
