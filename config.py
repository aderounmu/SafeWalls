#config 
import os 

class Config:
	DEBUG = False
	DEVELOPMENT = False

class ProductionConfig(Config):
	pass

class StagingConfig(Config):
	DEBUG = True
	pass

class DevelopmentConfig(Config):
	DEBUG = True
	DEVELOPMENT = True
	pass

