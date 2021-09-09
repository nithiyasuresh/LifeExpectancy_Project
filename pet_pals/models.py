from .app import db

class Life_Expactancy(db.Model):
    __tablename__ = 'life_expect'

    country = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String(64))
    life_expectancy = db.Column(db.Float)
    adult_mortality = db.Column(db.Float)
    BMI = db.Column(db.Float)
    GDP = db.Column(db.Float)
    population = db.Column(db.Float)
    polio = db.Column(db.Float)
    HIV_AIDS = db.Column(db.Float)
    Hepatitis_B = db.Column(db.Float)
    Measles = db.Column(db.Float)

    def __repr__(self):
        return '<Life Expectancy %r>' % (self.name)
