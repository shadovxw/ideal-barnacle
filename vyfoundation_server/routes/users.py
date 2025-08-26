from flask import Blueprint, request, jsonify
from db import db, User

users_bp = Blueprint("users", __name__)

@users_bp.route("/", methods=["GET"])
def get_all():
    users = User.query.all()
    return jsonify(success=True, users=[u.to_dict() for u in users])

@users_bp.route("/withemail/<emailid>", methods=["GET"])
def get_by_email(emailid):
    users = User.query.filter_by(email=emailid).all()
    return jsonify(success=True, users=[u.__dict__ for u in users])

@users_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(success=True, message="Data saved successfully")

@users_bp.route("/update", methods=["PUT"])
def update():
    data = request.json
    user_id = data.pop("id", None)
    if not user_id:
        return jsonify(success=False, message="ID is required"), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify(success=False, message="User not found"), 404

    for key, value in data.items():
        setattr(user, key, value)

    db.session.commit()
    return jsonify(success=True, message="Data updated")

@users_bp.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    user = User.query.get(id)
    if not user:
        return jsonify(success=False, message="User not found"), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify(success=True, message="Data deleted successfully")
