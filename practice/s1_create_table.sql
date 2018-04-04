create database mydb;
use mydb;

create table sensors(
id int not null auto_increment primary key,
seq int(10) unsigned,
device decimal(4,0) unsigned,
unit decimal(2,0) unsigned,
type char(1),
value decimal(10,4),
ip char(15),
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE USER 'bn3monkey'@'localhost' IDENTIFIED BY 'p5j6g2h0';
GRANT ALL PRIVILEGES ON mydb.* TO 'bn3monkey'@'localhost';
FLUSH PRIVILEGES;
