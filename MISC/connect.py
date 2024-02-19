import pymysql

class Connect:

    def dbconnect(self):
        return pymysql.connect(host="localhost",user="root",password="",database="usermanagement",charset="utf8mb4")