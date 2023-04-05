CREATE DATABASE gooo_online_store;
use gooo_online_store;

create user "gooo_online_store_admin"@"localhost" identified BY "(i6zuRjj2QWPqMYSQL_gooo-store";
grant all privileges on gooo_online_store.* to "gooo_online_store_admin"@"localhost";

create table user (id int auto_increment primary key, username varchar(50) not null, password varchar(250) not null, firstname varchar(250) not null, lastname varchar(250) not null, email varchar(250) not null, created_at timestamp not null, is_admin tinyint(1) default 0, location varchar(250) default null, constraint unique (email));
create table user_activation (id int auto_increment primary key, user_id int not null, activation_link varchar(250) default null, is_activated tinyint(1) default 0, created_at timestamp not null, foreign key (user_id) references user(id));
create table user_recovery_code (id int auto_increment primary key, user_id int not null, value varchar(250) default null, created_at timestamp not null, is_used tinyint(1) not null default 0, foreign key (user_id) references user(id));
create table user_refresh_token (id int auto_increment primary key, user_id int not null, value varchar(250) default null, created_at timestamp not null, foreign key (user_id) references user(id));

create table product_category (id int auto_increment primary key, parent_id int default 0, name varchar(60) not null, created_at timestamp not null, label varchar(60) not null, constraint check (name <> ""), constraint check (label <> ""));
create table product (id int auto_increment primary key, name varchar(150) not null, price float default null, weight float default null, short_description varchar(1000) not null, long_description text not null, category_id int not null, stock int default null, created_at timestamp not null, weight_units varchar(10) not null, foreign key (category_id) references product_category(id));
create table product_image (id int auto_increment primary key, product_id int not null, link varchar(250) not null, foreign key (product_id) references product(id));
create table shopping_cart (id int auto_increment primary key, user_id int not null, product_id int not null,  created_at timestamp not null, quantity int not null default 1, is_selected tinyint(1) not null default 1, foreign key (user_id) references user(id), foreign key (product_id) references product(id), constraint check (quantity >= 0));
