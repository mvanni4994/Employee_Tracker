DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE title_role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX department_index (department_id),
  CONSTRAINT department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT title_role FOREIGN KEY (role_id) REFERENCES title_role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX manager_index (manager_id),
  CONSTRAINT manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department
    (name)
VALUES
    ('Thieves Guild'),
    ('Wizard College'),
    ('Warrior Guild'),
    ('Archer Battalion');

INSERT INTO title_role
    (title, salary, department_id)
VALUES
    ('Scouting Team', 30000, 1),
    ('Thief', 50000, 1),
    ('Student', 35000, 2),
    ('Professor', 75000, 2),
    ('Trapper', 60000, 3),
    ('Bounty Hunter', 80000, 3),
    ('Headmaster', 95000, 2),
    ('Marksman', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Noctis', 'Caelum', 1, 1),
    ('Prompto', 'Argentum', 2, 1),
    ('Lunafreya', 'Fleuret', 3, 1),
    ('Ardyn', 'Izunia', 4, 2),
    ('Gladiolus', 'Amicitia', 5, 1),
    ('Ignis', 'Scientia', 6, 1),
    ('Ravus', 'Fleuret', 7, 1),
    ('Regis', 'Lucis', 8, 6);


SELECT * FROM employee_trackerDB.employee;

SELECT * FROM employee_trackerDB.title_role;

SELECT * FROM employee_trackerDB.department;