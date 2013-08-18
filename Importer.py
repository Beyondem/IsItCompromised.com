import pymongo
import hashlib
import os
mongodb_uri = 'mongodb://localhost:27017'


try:
	connection = pymongo.Connection(mongodb_uri)
	database = connection.password
	print 'Connected to Mongo'
except:
	print 'Error: Unable to connect to database.'
	connection = None

if connection is not None:
	print 'Importing...'
	file = open("passwords.txt","r")
	for line in file:
		line = line.replace("\n","")
		linemd5 = hashlib.md5(line).hexdigest()
		print 'Raw: %s - MD5: %s' % (line,linemd5)
		database.passwords.insert({'hashed':linemd5})

