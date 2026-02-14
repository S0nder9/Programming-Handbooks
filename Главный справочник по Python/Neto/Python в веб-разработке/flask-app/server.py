import flask
from flask import request
from flask.views import MethodView
from models import User, Session
from sqlalchemy.exc import IntegrityError
import traceback
from schema import UpdateUser, CreateUser
from flask_bcrypt import Bcrypt

app = flask.Flask("app")

bcrypt = Bcrypt(app)

def hash_password(password: str):
    password = password.encode()
    password = bcrypt.generate_password_hash(password)
    password = password.decode()
    return password

def check_password(password: str, hashed_password: str) -> bool:
    password = password.encode()
    hashed_password = hashed_password.encode()
    return bcrypt.check_password_hash(hashed_password, password)
    

class HttpError(Exception):
    def __init__(self, status_code, message):
        self.status_code = status_code
        self.message = message

@app.before_request
def before_request():
    session = Session()
    request.session = session

@app.after_request
def after_request(response: flask.Response):
    request.session.close()
    return response

@app.errorhandler(HttpError)
def error_handler(err: HttpError):
    json_response = flask.jsonify({"status": "error", "message": err.message})
    json_response.status_code = err.status_code
    return json_response

def get_user(user_id):
    user = request.session.get(User, user_id)
    if user is None:
        raise HttpError(status_code=404, message="User not found")
    return user

def add_user(user_data):
    try:
        user = User(**user_data)
        request.session.add(user)
        request.session.commit()
        return user
    except IntegrityError:
        request.session.rollback()
        raise HttpError(status_code=409, message="User already exists")

def validate(schema, json_data):
    try:
        return schema(**json_data).dict(exclude_unset=True)
    except ValueError as e:
        error = e.errors()[0]
        error.pop("ctx", None)
        raise HttpError(status_code=400, message=error)

class UserView(MethodView):
    def get(self, user_id: int):
        user = get_user(user_id)
        return flask.jsonify(user.dict)

    def post(self):
        try:
            user_data = request.json
            user_data = validate(CreateUser, user_data)
            user_data["password"] = hash_password(user_data["password"])
            user = add_user(user_data)
            return flask.jsonify(user.dict), 201
        except HttpError as e:
            raise
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            traceback.print_exc()
            raise HttpError(status_code=500, message=f"Server error: {str(e)}")

    def patch(self, user_id: int):
         user_data = request.json
         user_data = validate(UpdateUser, user_data)
         if "password" in user_data:
             user_data["password"] = hash_password(user_data["password"])
         user = get_user(user_id)
         for field, value in user_data.items():
             setattr(user, field, value)
         request.session.commit()
         return user.dict

    def delete(self, user_id: int):
        user = get_user(user_id)
        request.session.delete(user)
        request.session.commit()
        return flask.jsonify({"status": "deleted"})

user_view = UserView.as_view("user")
app.add_url_rule("/user/", methods=["POST"], view_func=user_view)
app.add_url_rule("/user/<int:user_id>/", methods=["GET", "PATCH", "DELETE"], view_func=user_view)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9999, debug=True)