from app import db , User_n , Crime
from werkzeug.security import generate_password_hash
import json
import random
from faker import Faker
from datetime import datetime, timedelta


fake = Faker()

db.drop_all()
db.create_all()




#list_crimes = ['robbery','carjacking','kidnapping','riot','Flood','EarthQuakes']
list_crimes = ['robbery','kidnapping','riot']

list_locations = [{
	"lat":6.519682824903449,
	"long":3.376910439439669,
	"text":"Morris Street, Abule ijesha, Lagos",
},{
	"lat":6.5195450477737475,
	"long":3.351558518991289,
	"text":"26Fagbenro Street, Idi Oro, Lagos",
},{
	"lat":6.553532120858199, 
	"long":3.3929472063676713,
	"text": "15-9 Williams St, Gbagada 100242, Lagos",
},{
	"lat":6.605174643334711, 
	"long":3.3500943110551225,
	"text":"95 Allen Ave, Allen, Ikeja",
},{
	"lat":6.499597717440658,
	"long":3.3783329547860013,
	"text":"Herbert Macaulay Way, Alagomeji-Yaba 100001, Lagos",
},{
	"lat":6.466472361696163, 
	"long":3.290098193408693,
	"text":"Festac Town, Lagos",
},{
	"lat":6.46817805133493, 
	"long":3.2892398865377124,
	"text":"3rd Ave, Festac Town, Lagos",
}]

s_password_hashed = generate_password_hash('new_12345',method='sha256')
new_user = User_n(name="new_user",email="new_user@g.com",password=s_password_hashed)
db.session.add(new_user)
db.session.commit()


for _ in range(3):
	n_user = fake.profile()
	new_user = User_n(name=n_user["name"],email=n_user["mail"],password=s_password_hashed)
	db.session.add(new_user)
	db.session.commit()

for x in range(60):
	len_user = len(User_n.query.all())
	user1 = User_n.query.get(random.randint(0,len_user-1) + 1)
	now = datetime.utcnow()
	m_hours = random.randint(0,6)
	i_date = now - timedelta(hours=m_hours)
	i_tweet_id = None
	i_location = list_locations[random.randint(0,len(list_locations)-1)]
	i_details = fake.sentence()
	i_crime = list_crimes[random.randint(0,len(list_crimes)-1)]
	sentiment_score = None
	i_public = True
	new_crime = Crime(tweet_id = i_tweet_id,location = json.dumps(i_location),loc_lat=i_location["lat"],loc_long=i_location["long"],loc_text=i_location["text"],details = i_details,crime = i_crime,date = i_date,sentiment_score = None,is_public = i_public,author = user1)
	db.session.add(new_crime)
	db.session.commit()
	print('Done ........')

# my_crime = Crime.query.get(1)
# print(my_crime.loc_lat)
# print(my_crime.loc_long)
