
class Config:
    # PostgreSQL connection URI
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:postgres@localhost:5432/vyfoundation"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Gmail SMTP
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "sir.dazai02@gmail.com"
    MAIL_PASSWORD = "wlfw wwyf ljnc lalt"
    MAIL_DEFAULT_SENDER = ("VY FOUNDATION", "sir.dazai02@gmail.com")

