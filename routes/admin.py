# routes/admin.py
from flask import Blueprint, render_template, request, jsonify,session,url_for
from module import database

db = database.Database()
admin_bp = Blueprint('admin', __name__,url_prefix='/admin')

@admin_bp.route('/home')
def home():
    username = session.get('username', None)
    role = session.get('role',None)
    pfp = session.get('pfp',None)
    # print(pfp)
    if role:
        if role =='admin':
            context ={'username':username,'role':role,'pfp':pfp,'homeurl':url_for('admin.home')}
            return render_template('admin/dashboard.html',**context)
        else:
            context ={'homeurl':url_for('admin.home')}
            return render_template('wrong_page.html',**context)
    else:
        return render_template('login.html')

@admin_bp.route("/getEmployees",methods=['POST'])
def getEmployees():
    data = request.form
    # print("this is data:  ",data)
    try:
        employee_data = db.showEmployee(data)
        # print(employee_data)
        if employee_data:
            return jsonify(employee_data)
        else:
            return jsonify({"error":"An Error Occured While Fetching Data"})
    except:
        return jsonify({"error":"An Error Occured While Fetching Data"})