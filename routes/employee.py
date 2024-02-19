# routes/employee.py
from flask import Blueprint, render_template, session, url_for
from module import database

db = database.Database()
employee_bp = Blueprint('employee', __name__,url_prefix='/employee')

@employee_bp.route('/home')
def home():
    username = session.get('username', None)
    role = session.get('role',None)
    pfp = session.get('pfp',None)
    if role:
        if role =='employee':
            context ={'username':username,'role':role,'pfp':pfp,'homeurl':url_for('employee.home')}
            return render_template('employee/dashboard.html',**context)
        else:
            return render_template('wrong_page.html')
    else:
        return render_template('login.html')