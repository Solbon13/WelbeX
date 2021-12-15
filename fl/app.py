from flask import Flask
from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Configuration)

db = SQLAlchemy(app)
CORS(app)

import router