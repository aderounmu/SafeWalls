from flask import Flask, request , Response , jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash , check_password_hash
import os
from dotenv import load_dotenv
from controller import Controllers
from flask_cors import CORS
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt , current_user
import json
from services import services
from geopy import distance
from sqlalchemy import func
load_dotenv()

app = Flask(__name__)
#app.config.from_object(os.getenv("APP_SETTINGS","config.DevelopmentConfig"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']= os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('APP_JWT_SECRET')

db = SQLAlchemy(app)
jwt = JWTManager(app)

Controllers(db)

CORS(app)

#from models import tweetModels

from sqlalchemy.dialects.postgresql import JSON

##
# DATABASE MODELS
##

class Crime(db.Model):
	__tablename__ = 'crime'

	id = db.Column(db.Integer, primary_key = True)
	location = db.Column(JSON,nullable=False)
	loc_lat = db.Column(db.Float(precision=20, asdecimal=False, decimal_return_scale=None))
	loc_long = db.Column(db.Float(precision=20, asdecimal=False, decimal_return_scale=None))
	loc_text = db.Column(db.String())
	details = db.Column(db.Text())
	tweet_id = db.Column(db.String())
	crime = db.Column(db.String())
	date = db.Column(db.DateTime,nullable=False,default=datetime.utcnow())
	sentiment_score = db.Column(db.Integer)
	is_public = db.Column(db.Boolean)
	user_n_id = db.Column(db.Integer, db.ForeignKey('user_n.id'), nullable=False)

	# def __init__(self,tweet_id,location,details,crime,date,sentiment_score,is_public):
	# 	self.tweet_id = tweet_id
	# 	self.location = location
	# 	self.details = details
	# 	self.crime = crime
	# 	self.date = date
	# 	self.sentiment_score = sentiment_score
	# 	self.is_public = is_public
	# 	pass

	

	def __repr__(self):
		return '<id {}>'.format(self.id)

class User_n(db.Model):
	__tablename__ = 'user_n'
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(),nullable=False)
	email = db.Column(db.String(),nullable=False, unique=True)
	password = db.Column(db.String())
	create_date = db.Column(db.DateTime,nullable=False,default=datetime.utcnow())
	crimes = db.relationship('Crime',backref='author',lazy=True)

#user model
# class User(db.Model):
# 	__tablename__ = 'user'

# 	id = db.Column(db.Integer, primary_key = True)
# 	name = db.Column(db.String(),nullable=False)
# 	email = db.Column(db.String(),nullable=False, unique=True)
# 	password = db.Column(db.String())
# 	create_date = db.Column(db.DateTime,nullable=False,default=datetime.utcnow())
# 	crimes = db.relationship('Crime',backref='author',lazy=True)
	
	

	# def __init__(self, name, email, password):
	# 	self.name = name
	# 	self.email = email
	# 	self.password = password

	# def __repr__(self):
	# 	return '<id {}>'.format(self.id)


#revoked token model
class RevokedToken(db.Model):
	__tablename__ = 'revoked_tokens'

	id = db.Column(db.Integer, primary_key = True)
	jti = db.Column(db.String(140))
	create_date = db.Column(db.DateTime,nullable=False,default=datetime.utcnow())

	def __init_(self,jti):
		self.jti = jti

	def add(self):
		db.session.add(self)
		db.session.commit()

	@classmethod
	def is_jti_blacklisted(cls,jti):
		query = cls.query.filter_by(jti=jti).first()
		return bool(query)

##
# Access Functions for JWT
##
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header,jwt_payload):
	jti = jwt_payload['jti']
	return RevokedToken.is_jti_blacklisted(jti)

@jwt.user_identity_loader
def user_identity_lookup(user_n):
	return user_n.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header,jwt_data):
	identity = jwt_data["sub"]
	return User_n.query.filter_by(id=identity).one_or_none()


##
# APPLICATION ROUTES 
##
@app.route('/')
def index():
	return 'HOME'

@app.route('/api/crime/show/<crime_id>',methods=['GET'])
def show(crime_id):
	crime = Crime.query.filter_by(id = id ).first()
	return ''

@app.route('/api/crime/recent/<lat>/<lon>',methods=['GET'])
def recent(lat,lon):
	now = datetime.utcnow()
	last_24_hours = now - timedelta(hours=24)
	lon = float(lon)
	lat = float(lat)
	
	crimes = Crime.query.filter(func.acos(func.sin(func.radians(lat)) * func.sin(func.radians(Crime.loc_lat)) + func.cos(func.radians(lat)) * func.cos(func.radians(Crime.loc_lat)) * func.cos(func.radians(Crime.loc_long)-func.radians(lon)))*6371 <= 40 , Crime.date >= last_24_hours).all()
	data = [{"id": x.id,"tweet_id": x.tweet_id ,"location": json.loads(x.location),"details": x.details,"crime" : x.crime,"date": x.date, "sentiment_score": None,"is_public": x.is_public,"author" :{ "id" :x.author.id , "email" : x.author.email}} for x in crimes]
	
	serv = services()

	analyzed_data = serv.analyze_data(data)
	#
	return jsonify({"count": len(data),"raw_data": data,"t_analyzed": analyzed_data})


@app.route('/api/crime/add/',methods=['POST'])
@jwt_required()
def crime_store():
	c_user= current_user
	i_tweet_id =  request.form.get("tweet_id")
	i_location =  request.form.get("location") 
	i_details = request.form.get("details") 
	i_crime = request.form.get("crime") 
	i_date = request.form.get("date") 
	i_public = request.form.get("public")
	i_public = False if i_public == "0" else True

	location = json.loads(i_location)

	crime = Crime(tweet_id = i_tweet_id,location = i_location,loc_lat=location["lat"],loc_long=location["long"],loc_text=location["text"],details = i_details,crime = i_crime,date = i_date,sentiment_score = None,is_public = i_public,author = c_user)

	db.session.add(crime)
	db.session.commit()

	return jsonify({"data":[{"id": crime.id,"tweet_id": crime.tweet_id ,"location": json.loads(crime.location),"details": crime.details,"crime" : crime.crime,"date": crime.date, "sentiment_score": None,"is_public": crime.is_public,"author" :{ "id" :c_user.id , "email" : c_user.email}}] })

@app.route('/api/crime/mycrimes/',methods=['GET'])
@jwt_required()
def my_crimes():
	c_user = current_user
	my_crimes = User_n.query.get(c_user.id).crimes
	data = [{"tweet_id": x.tweet_id ,"location": json.loads(x.location),"details": x.details,"crime" : x.crime,"date": x.date, "sentiment_score": None,"is_public": x.is_public,"author" :{ "id" :x.author.id , "email" : x.author.email}} for x in my_crimes]
	return jsonify({"data": data})

@app.route('/api/token/',methods=['GET'])
@jwt_required()
def my_check_token():
	data = {'message': 'token still valid', 'isValid': True}
	return jsonify({"data": data})

@app.route('/api/login',methods=['POST'])
def login():
	i_password = request.form.get('password')
	i_email= request.form.get('email')

	if not i_email or not i_password:
		return 'field are required' , 400
	
	user = User_n.query.filter_by(email=i_email).first()

	if not user:
		return'User Doesnt exist' , 400 

	if check_password_hash(user.password,i_password):
		access_token = create_access_token(identity=user)
		details = {"user" : user.email , "access_token" : access_token }
		return jsonify(details)

	return'authorization failed' , 400 
	

@app.route('/api/register',methods=['POST'])
def register():
	i_password = request.form.get('password')
	i_name = request.form.get('name')
	i_email= request.form.get('email')

	
	if  not i_password or not i_name or not i_email:
		return jsonify({'msg' : 'credentials missing'}), 400

	user = User_n.query.filter_by(email=i_email).first()

	if user : 
		return jsonify({'msg' : 'user exist'}), 400

	try:
		password_hashed = generate_password_hash(i_password,method='sha256')
		new_user = User_n(name=i_name,email= i_email,password=password_hashed)
		db.session.add(new_user)
		db.session.commit()

		access_token = create_access_token(identity=new_user)
		details = {"id": new_user.id, "user" : new_user.email , "access_token" : access_token }
		return jsonify(details)
	except Exception as e:
		return {'msg': e.message} , 400
	

@app.route('/api/logout',methods=["DELETE"])
@jwt_required()
def logout():
	jti = get_jwt()['jti']

	#invalidate acces token 
	revoked_token = RevokedToken(jti=jti)
	revoked_token.add()

	return {msg: 'Token revoked'} , 200



if __name__ == '__main__':
	# db.drop_all()
	# db.create_all()
	app.run(debug=True,port=4500)