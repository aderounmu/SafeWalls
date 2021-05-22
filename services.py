#List of services for the programm

import numpy as np 
import pandas as pd
from geopy import distance

data = [
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 02:55:54 GMT",
            "details": "That enter bad into.",
            "id": 1,
            "is_public": True,
            "location": {
                "lat": 6.519682824903449,
                "long": 3.376910439439669,
                "text": "Morris Street, Abule ijesha, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 04:55:54 GMT",
            "details": "Someone red leader message.",
            "id": 2,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 06:55:54 GMT",
            "details": "Test page pull agree social her.",
            "id": 3,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 04:55:54 GMT",
            "details": "Unit according such seven.",
            "id": 4,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 06:55:54 GMT",
            "details": "Myself day anyone offer group follow.",
            "id": 5,
            "is_public": True,
            "location": {
                "lat": 6.553532120858199,
                "long": 3.3929472063676713,
                "text": "15-9 Williams St, Gbagada 100242, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 06:55:54 GMT",
            "details": "Record group choice perhaps cold ground cell.",
            "id": 6,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 04:55:54 GMT",
            "details": "Through decide cold check couple these.",
            "id": 7,
            "is_public": True,
            "location": {
                "lat": 6.605174643334711,
                "long": 3.3500943110551225,
                "text": "95 Allen Ave, Allen, Ikeja"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 07:55:54 GMT",
            "details": "Week charge management seat begin admit.",
            "id": 8,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 07:55:54 GMT",
            "details": "Benefit central study.",
            "id": 9,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 06:55:54 GMT",
            "details": "Woman bed experience important within.",
            "id": 10,
            "is_public": True,
            "location": {
                "lat": 6.519682824903449,
                "long": 3.376910439439669,
                "text": "Morris Street, Abule ijesha, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 07:55:54 GMT",
            "details": "Five health hand week difference.",
            "id": 11,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 06:55:54 GMT",
            "details": "So president cultural parent cut short manage political.",
            "id": 12,
            "is_public": True,
            "location": {
                "lat": 6.5195450477737475,
                "long": 3.351558518991289,
                "text": "26Fagbenro Street, Idi Oro, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 07:55:54 GMT",
            "details": "Form five message condition detail ago too.",
            "id": 13,
            "is_public": True,
            "location": {
                "lat": 6.5195450477737475,
                "long": 3.351558518991289,
                "text": "26Fagbenro Street, Idi Oro, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 02:55:54 GMT",
            "details": "Also officer line share action door.",
            "id": 14,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 05:55:54 GMT",
            "details": "Second protect seat hot plan player style.",
            "id": 15,
            "is_public": True,
            "location": {
                "lat": 6.553532120858199,
                "long": 3.3929472063676713,
                "text": "15-9 Williams St, Gbagada 100242, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 05:55:54 GMT",
            "details": "Customer onto less per.",
            "id": 16,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 02:55:54 GMT",
            "details": "Since add rise marriage.",
            "id": 17,
            "is_public": True,
            "location": {
                "lat": 6.499597717440658,
                "long": 3.3783329547860013,
                "text": "Herbert Macaulay Way, Alagomeji-Yaba 100001, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 04:55:54 GMT",
            "details": "Day company summer themselves.",
            "id": 18,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 05:55:55 GMT",
            "details": "Contain morning music throughout real catch news college.",
            "id": 19,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 05:55:55 GMT",
            "details": "Others federal road would our western how.",
            "id": 20,
            "is_public": True,
            "location": {
                "lat": 6.605174643334711,
                "long": 3.3500943110551225,
                "text": "95 Allen Ave, Allen, Ikeja"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 07:55:55 GMT",
            "details": "Yes remain health heart talk even.",
            "id": 21,
            "is_public": True,
            "location": {
                "lat": 6.499597717440658,
                "long": 3.3783329547860013,
                "text": "Herbert Macaulay Way, Alagomeji-Yaba 100001, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 02:55:55 GMT",
            "details": "Answer talk wait wonder guess into.",
            "id": 22,
            "is_public": True,
            "location": {
                "lat": 6.605174643334711,
                "long": 3.3500943110551225,
                "text": "95 Allen Ave, Allen, Ikeja"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 06:55:55 GMT",
            "details": "Away entire day energy half soldier.",
            "id": 23,
            "is_public": True,
            "location": {
                "lat": 6.519682824903449,
                "long": 3.376910439439669,
                "text": "Morris Street, Abule ijesha, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 06:55:55 GMT",
            "details": "Act similar central young loss stand.",
            "id": 24,
            "is_public": True,
            "location": {
                "lat": 6.605174643334711,
                "long": 3.3500943110551225,
                "text": "95 Allen Ave, Allen, Ikeja"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "riot",
            "date": "Fri, 21 May 2021 07:55:55 GMT",
            "details": "Join should offer natural me sea.",
            "id": 25,
            "is_public": True,
            "location": {
                "lat": 6.5195450477737475,
                "long": 3.351558518991289,
                "text": "26Fagbenro Street, Idi Oro, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 05:55:55 GMT",
            "details": "White set stop maintain fire.",
            "id": 26,
            "is_public": True,
            "location": {
                "lat": 6.5195450477737475,
                "long": 3.351558518991289,
                "text": "26Fagbenro Street, Idi Oro, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "new_user@g.com",
                "id": 1
            },
            "crime": "kidnapping",
            "date": "Fri, 21 May 2021 07:55:55 GMT",
            "details": "Left west along personal industry.",
            "id": 27,
            "is_public": True,
            "location": {
                "lat": 6.46817805133493,
                "long": 3.2892398865377124,
                "text": "3rd Ave, Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "johnlewis@gmail.com",
                "id": 3
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 05:55:55 GMT",
            "details": "Discover go lot education reflect measure own.",
            "id": 28,
            "is_public": True,
            "location": {
                "lat": 6.5195450477737475,
                "long": 3.351558518991289,
                "text": "26Fagbenro Street, Idi Oro, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "audreyjacobs@gmail.com",
                "id": 2
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 08:55:55 GMT",
            "details": "Financial let determine make risk particularly us.",
            "id": 29,
            "is_public": True,
            "location": {
                "lat": 6.553532120858199,
                "long": 3.3929472063676713,
                "text": "15-9 Williams St, Gbagada 100242, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        },
        {
            "author": {
                "email": "epierce@gmail.com",
                "id": 4
            },
            "crime": "robbery",
            "date": "Fri, 21 May 2021 06:55:55 GMT",
            "details": "Popular know next change a hospital player.",
            "id": 30,
            "is_public": True,
            "location": {
                "lat": 6.466472361696163,
                "long": 3.290098193408693,
                "text": "Festac Town, Lagos"
            },
            "sentiment_score": None,
            "tweet_id": None
        }
]


#Twint 

class services:
	def __init__(self):
		pass

	def call_Twint(self):
		pass

	def analayzed_Text(self):
		pass

	def extract_location(self):
		pass

	#1point1 and point2 must be tuples
	def check_radius(self,point1,point2, radius):
		d = distance.distance(point1,point2).km
		value = False if d > radius else True
		return value

	def analyze_data(self,data):
		#point1,point2
		#data to analyzed
		df_data = pd.DataFrame.from_dict(data)
		pd_data = df_data.to_numpy()

		#final analyzed data
		analyzed_data = []
		#array of analyzed id
		checked = []
		i = 0

		for x in pd_data:
			i  = i + 1
			x_data = []
			if x[0] not in checked:
				for y in pd_data: 
					if(y[0] not in checked and y[4] == x[4]):
						point1 = (x[2]["lat"],x[2]["long"])
						point2 = (y[2]["lat"],y[2]["long"])
						value = self.check_radius(point1,point2,10)
						if(value):
							my_data = df_data[df_data.id == y[0]]
							x_data.append(my_data.to_dict('records')[0])
							checked.append(y[0])
					else:
						#do nothing
						pass

				checked.append(x[0])
				analyzed_data.append({
                    "data_id": i,
					"count": len(x_data),
					"center":{'lat':x[2]["lat"] , 'long':x[2]["long"], 'text': x[2]["text"]},
					"crime": x[4],
					"Radius": 10,
					"All_data":x_data
				})

		return analyzed_data
		

