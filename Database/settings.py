# Youtube Video for tutorial: https://www.youtube.com/watch?v=xz5Ilc6GDVc&list=PLXswBSp5YNOtm2XvxiPRUCXFT2bUNecXP

import os 
import dotenv
import dj_database_url
from pathlib import Path


DATABASE_URL = "postgresql://minds:mC0J0ju0Fl6JjRC8Y8RHYg@minds-database-9454.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

BASE_DIR = Path("C:/Users/65890/Documents/SP Modules Y2Sem1/Dell/sos-innodash2024")

DATABASES = {'default': dj_database_url.config(default=DATABASE_URL, engine='django_cockroachdb')}
