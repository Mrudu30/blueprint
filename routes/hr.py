# routes/hr.py
from flask import Blueprint, render_template,session,url_for,request,jsonify
from module import database

db = database.Database()
hr_bp = Blueprint('hr', __name__,url_prefix='/hr')

@hr_bp.route('/home')
def home():
    username = session.get('username', None)
    role = session.get('role',None)
    pfp = session.get('pfp',None)
    if role:
        if role == 'hr':
            context ={'username':username,'role':role,'pfp':pfp,'homeurl':url_for('hr.home')}
            return render_template('hr/dashboard.html',**context)
        else:
            context ={'homeurl':url_for('hr.home')}
            return render_template('wrong_page.html ',**context)
    else:
        return render_template('login.html')

@hr_bp.route("/getEmployees",methods=['POST'])
def getEmployees():
    data = request.form
    # print(data)
    try:
        employee_data = db.showEmployee(data)
        # print(employee_data)
        if employee_data:
            return jsonify(employee_data)
        else:
            return jsonify({"error":"An Error Occured While Fetching Data"})
    except:
        return jsonify({"error":"An Error Occured While Fetching Data"})