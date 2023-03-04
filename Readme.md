### Hello, this project write using React and Express.

If you want to run project on your local machine - first of all you need to write **manually** your test Gmail address in the ```public.env``` file(```SMTP_EMAIL_ADDRESS``` env variable) in the ```./backend``` directory.
Also you ought to create SMTP password in the Gmail account and copy this one to the ```SMTP_EMAIL_PASSWORD``` field in the same file.

So, now we need to create database using MySql script. Just execute script named ```online-store-db.sql``` and the database will be created.

And now we can start to use the application. In the command line write: ```npm run dev```

Here it is!

***Working routes(front end):***
1.  http://localhost:3000/main
2.  http://localhost:3000/filtering
3.  http://localhost:3000/user/login
5.  http://localhost:3000/user/registration
6.  http://localhost:3000/user/recovery/get-link
7.  http://localhost:3000/user/recovery/:recoveryLink
8.  http://localhost:3000/administration/product/create
9.  http://localhost:3000/administration/category/create
10.  http://localhost:3000/product/:productId
11.  http://localhost:3000/cart


***Working routes(back end):***
1. user
    - http://localhost:5000/api/user/registration (POST)
    - http://localhost:5000/api/user/login (POST)
    - http://localhost:5000/api/user/logout (POST)
    - http://localhost:5000/api/user/refresh (GET)
    - http://localhost:5000/api/user/activate/:link (GET)
    - http://localhost:5000/api/user/recovery/get-link (POST)
    - http://localhost:5000/api/user/recovery/:code (POST)
    - http://localhost:5000/api/user/shopping-cart (GET)
    - http://localhost:5000/api/user/shopping-cart/:productId (POST, DELETE)
    - http://localhost:5000/api/user/shopping-cart/change-select/:productId (POST)
    - http://localhost:5000/api/user/shopping-cart/reduce-quantity/:productId (POST)
    - http://localhost:5000/api/user/all (GET)
2. category
    - http://localhost:5000/api/category (GET, POST)
3. product
    - http://localhost:5000/api/product (GET, POST)
    - http://localhost:5000/api/product/:id (GET)

# Thanks for your attention