from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    songs = db.relationship("Song", back_populates="uploader", cascade='all, delete-orphan')
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    liked_songs = db.relationship("LikedSong", back_populates="user", cascade="all, delete-orphan")
    profile_image = db.relationship("UserImage", back_populates="user", cascade='all, delete-orphan')

    # playlists = db.relationship('Playlist', backref='owner')
    # liked_songs = db.relationship('LikedSong', backref='liker')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
                # New code starts here #################
        if password == 'OAUTH':
            self.hashed_password = 'OAUTH' # If we look at the password_checker() method, we see that it hashes the user input and compares it
                        ## during login. With this adjustment, even a data breach would NOT expose our Oauth users to
                        ### having their accounts accessed with our default password for Oauth logins, 'OAUTH', as it would never
                        #### hash to that value.
            return
        # New code ends here ####################
        else:
            self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
