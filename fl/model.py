from datetime import date
from app import db

class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    title = db.Column(db.String(100), unique=True)
    count = db.Column(db.Integer)
    distance = db.Column(db.Integer)

    def __init__(self, *args, **kwargs):
        super(Table, self).__init__(*args, **kwargs)

db.create_all()

# загрузим данные в таблицу
import random
if len(Table.query.all()) == 0:
    for i in range(1, 20):
        a = ord('А')
        letters = ([chr(i) for i in range(a,a+64)])
        rand_string = ''.join(random.choice(letters) for i in range(15))
        rec = Table(title=rand_string, date=date.today(), count=random.randrange(10, 500, 5), distance=random.randrange(1, 50, 2))
        db.session.add(rec)
        db.session.commit()