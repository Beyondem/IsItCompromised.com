IsItCompromised.com
===================

The source powering http://IsItCompromised.com

<b>What Is It?</b>
======
IsItCompromised.com keeps a database of leaked passwords. I went around collecting databases of leaked passwords, hashed them and added them to the database.
When searching, the search is hashed in the client and sent to the server. The server will never see the raw password. This hash is then compared against the database to see if it has been compromised.

<b>The Setup</b>
=

NodeJS + WebSockets + MongoDB

After having your MongoDB setup, running isitcompromised.js will build the database structure. To speed searches up, run:
db.passwords.ensureIndex({'hashed':1}) from the mongo shell.

The file Importer.py will read in the text file and import the passwords to the database. 
