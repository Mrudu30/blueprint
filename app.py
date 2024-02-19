# app.py
from flask import Flask,render_template,request,jsonify,session,redirect,url_for,send_from_directory
from routes.hr import hr_bp
from routes.employee import employee_bp
from routes.admin import admin_bp
from module import database
import os

db = database.Database()
auth = database.Authenticate()
app = Flask(__name__)
app.secret_key ="CompanySECRETSSs"

app.register_blueprint(hr_bp)
app.register_blueprint(employee_bp)
app.register_blueprint(admin_bp)

# ---------- Login Form Render ------------
@app.route('/home')
@app.route('/admin')
@app.route('/hr')
@app.route('/employee')
@app.route("/")
def login():
    return render_template('login.html')

# ---------- add employees ---------
@app.route("/addEmployee",methods=['POST'])
def addEmployee():
    data = request.form
    # print(data)
    pfp = request.files['pfp']

    if pfp:
        # Get the path to the directory of the Flask application
        app_dir = os.path.dirname(os.path.abspath(__file__))

        # Save the file in the 'profiles' directory within the app directory
        pfp.save(os.path.join(app_dir, 'profiles', pfp.filename))
        pfpname = pfp.filename
    else:
        pfpname = data['oldpfp']
    if db.addEmployee(data,pfpname):
        return jsonify({'status':'success','message':'employee added successfully'})
    else:
        return jsonify({'status':'error','message':'employee not added'})

# ----------- update employees --------
@app.route("/updateEmployee",methods=['POST'])
def updateEmployee():
    data = request.form
    # print(request.files)
    pfp = request.files['pfp']

    if pfp:
        # Get the path to the directory of the Flask application
        app_dir = os.path.dirname(os.path.abspath(__file__))

        # Save the file in the 'profiles' directory within the app directory
        pfp.save(os.path.join(app_dir, 'profiles', pfp.filename))
        pfpname = pfp.filename
    else:
        pfpname = data['oldpfp']

    if session['role'] == data['role'] and session['username'] == data['username'] :
        session['pfp']=pfpname
    else:
        pass

    # print(data)
    if db.updateEmployee(data,pfpname):
        return jsonify({'status':'success','message':f"{data['role']} updated successfully"})
    else:
        return jsonify({'status':'error','message':f"an error occured while updating {data['role']}"})

@app.route('/static/profiles/<filename>')
def get_profile_photo(filename):
    return send_from_directory('E:/blueprint/profiles', filename)

# ----------- remove employees --------
@app.route("/removeEmployee",methods=['POST'])
def removeEmployee():
    data = request.form
    if db.removeEmployee(data):
        return jsonify({'status':'success','message':'employee deleted successfully'})
    else:
        return jsonify({'status':'error','message':'an error occured while removing employee'})

# ---------- validation functions ---------
@app.route("/checkUsername",methods=['POST'])
def checkUsername():
    data = request.form
    # print(data)
    check = db.checkUsername(data)
    # print(check)
    if check:
        return jsonify({'status':'success'})
    else:
        return jsonify({'status':'error'})

@app.route("/checkEmail",methods=['POST'])
def checkEmail():
    data = request.form
    if db.checkEmail(data):
        return jsonify({'status':'success'})
    else:
        return jsonify({'status':'error'})

# ---------- login logout handlers ---------
@app.route("/loginHandler",methods=['POST'])
def loginHandler():
    data = request.form
    # print(data)
    result = auth.login(data)
    return jsonify(result)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# error handling
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404_page.html')

if __name__ == "__main__":
    app.run(host='192.168.1.184',port=3004,debug=True)