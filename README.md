# CRM assignment



## Installation


- go to BACKEND folder and run

```bash
- npm install
- node seed.js # to create the system admin user (admin@app.com, test123)
- node index.js
```
- go to FRONTEND folder and run

```bash
- npm install
- npm start
```


you can now login with the created admin account.


## About the app
- Registration [basic role by default]
- Authentication 
- Authorization for admin, staff and basic role
- CRUD operations based on the role (as per assignment requirements)
  - Admin can add Staff by changing the role from basic to Staff
  - Staff roles can CRUD leads
  - Leads captured information ( name, email, phone )
- Users management only accessed by the admin
- Protected Routes
