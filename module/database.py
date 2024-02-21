from MISC.connect import Connect
from flask import url_for,session

class Database:

    def connect(self):
        return Connect.dbconnect(self)

    # ----------- READ -----------
    def showEmployee(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        id = data['id']
        role = data['role']
        try:
            query = f"SELECT * FROM"

            if role=="admin":
                query+=f" company"
            elif role=="hr":
                query += f" company_hr"
            elif role == "employee":
                query += f" company_employee"

            if id==None or id =="":
                query = query
            else:
                query += f" WHERE id={id}"

            cur.execute(query)
            return cur.fetchall()
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    # ------------ CREATE ------------
    def addEmployee(self,data,pfpname):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            query = f"INSERT INTO"
            values = (data['role'],data['username'],data['email'],data['password'],pfpname)
            if data['role'] == 'hr':
                query += f" company_hr(role,username,email,password,profile) VALUES(%s,%s,%s,%s,%s)"
            elif data['role'] == 'admin':
                query += f" company(role,username,email,password,profile) VALUES(%s,%s,%s,%s,%s)"
            else:
                query += f" company_employee(role,username,email,password,profile) VALUES(%s,%s,%s,%s,%s)"

            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    # ----------- UPDATE -------------
    def updateEmployee(self,data,pfpname):
        conn = Database.connect(self)
        cur = conn.cursor()

        if data['role'] == 'admin':
            table = 'company'
        elif data['role'] == 'hr':
            table = 'company_hr'
        elif data['role'] == 'employee':
            table = 'company_employee'

        try:
            query = f"UPDATE {table} SET username=%s, email=%s, password=%s, profile=%s WHERE id=%s "
            values = (data['username'],data['email'],data['password'],pfpname,data['id'])
            # print(cur.mogrify(query,values))
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    # ----------- DELETE -------------
    def removeEmployee(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        id = data['id']
        role = data['role']
        table = 'company_'+role

        try:
            query = f"DELETE FROM {table} WHERE id=%s "
            values = (id)
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    # ----------- VALIDATION FUNCTIONS ------------
    def checkUsername(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        username = data['username']
        role = data['role']

        if role == "" or role == "admin":
            table = 'company'
        elif role == "employee":
            table = "company_employee"
        elif role == "hr":
            table = "company_hr"

        try:
            query= f"SELECT * FROM {table} WHERE username='{username}'"
            print(query)
            cur.execute(query)
            result = cur.fetchone()
            if result:
                return False
            else:
                return True
        except:
            conn.rollback()
            return True
        finally:
            conn.close()

    def checkEmail(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        email = data['email']
        role = data['role']

        if role == "" or role == "admin":
            table = 'company'
        elif role == "employee":
            table = "company_employee"
        elif role == "hr":
            table = "company_hr"

        try:
            query= f"SELECT * FROM {table} WHERE email='{email}'"
            print(query)
            cur.execute(query)
            result = cur.fetchone()
            if result:
                return False
            else:
                return True
        except:
            conn.rollback()
            return True
        finally:
            conn.close()

class Authenticate:
    # ============== login authentication =================
    def login(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            # print(data)
            if data['role'] == 'admin':
                cur.execute(f"SELECT * FROM company WHERE email='{data['email']}'")
            elif data['role'] == 'hr':
                cur.execute(f"SELECT * FROM company_hr WHERE email='{data['email']}'")
            elif data['role'] == 'employee':
                cur.execute(f"SELECT * FROM company_employee WHERE email='{data['email']}'")

            empInfo = cur.fetchone()

            if empInfo:
                if (empInfo[4]==data['password']):
                    session['id'] = empInfo[0]
                    session['role'] = empInfo[1]
                    session['username'] = empInfo[2]
                    session['pfp'] = empInfo[5]
                    if empInfo[1] == "admin":
                        return {"success": True, "message": "", "redirect": url_for('admin.home')}
                    elif empInfo[1] == "employee":
                        return {"success": True, "message": "", "redirect": url_for('employee.home')}
                    elif empInfo[1] == "hr":
                        return {"success": True, "message": "", "redirect": url_for('hr.home')}
                else:
                    return {"success":False,"message":"Incorrect Password"}
            else:
                return {"success":False,"message":"No Such Employee Found"}
        except:
            conn.rollback()
            return {"success":False,"message":"An Error Occured"}
        finally:
            conn.close()