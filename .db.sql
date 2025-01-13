CREATE DATABASE if not exists todo_list;

CREATE USER if not exists 'todos'@'localhost' IDENTIFIED BY '3565';
GRANT ALL PRIVILEGES ON todo_list.* TO 'todos'@'localhost';
FLUSH PRIVILEGES;
