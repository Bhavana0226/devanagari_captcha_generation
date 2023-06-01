import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory , make_response , jsonify
from werkzeug.utils import secure_filename
import pathlib
from flask_cors import CORS
from config import *
from utils import *
from dev_captcha import *
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



load_dotenv()

app = Flask(__name__,static_folder ="uploads")
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/devnagari_captcha_generator'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost/devnagari_captcha_generator'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

   

    def __repr__(self):
        return '<User %r>' % self.name

with app.app_context():
    db.create_all()



@app.route('/generate_captcha', methods=['GET'])
def generate_captcha_for_frontend():
    captcha_string = generate_captcha()
    generate_mp3(captcha_string)
    # playsound.playsound(audio_file,True)
    # create_devanagari_mp3(captcha_string,"devnagari_captcha.mp3")
    response= make_response({'status' : "true", 'captcha' :captcha_string },200)
    response.headers['Content-Type']= 'application/json'
    return response


@app.route('/register_user', methods=['GET','POST'])
def register_user():
    if request.method == 'POST':
        body=dict(request.get_json())
        new_register = User(name=body['name'], email=body['email'], password=body['password'])
        db.session.add(new_register)
        db.session.commit()
        response= make_response({"name":body['name'], "email":body['email'], "password":body['password'],"status":"success"},200)
        response.headers['Content-Type']= 'application/json'
        return response


@app.route('/login_user', methods=['GET','POST'])
def login_user():
    if request.method == 'POST':
        body=dict(request.get_json())
        print(body)
        user = User.query.filter_by(email=body['email']).first()
        user = { key: value for key, value in user.__dict__.items() if not key.startswith('_') }
        print(user)
        if(user['password'] == body['password']):
            response= make_response({"login_status": "success","id":user['id'],"name":user['name'], "email":user['email']},200)
        else:
            response= make_response({"login_status": "failure"},200)
        response.headers['Content-Type']= 'application/json'
        return response


@app.route("/test_response")
def users():
    response= make_response({'status' : "true", 'image_path' : "test.jpg"},200)
    response.headers['Content-Type']= 'application/json'
    return response

def check_env():
    RANDOM_SEED = os.environ.get("RANDOM_SEED")
    if RANDOM_SEED is None:
        raise RuntimeError from None

if __name__ == "__main__":
    check_env()
    # load_variables()
    app.run(debug=True)