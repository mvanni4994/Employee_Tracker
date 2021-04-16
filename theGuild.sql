DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE title_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  -- department_id INT NOT NULL,
  PRIMARY KEY(id)
  -- INDEX department_index (department_id),
  -- FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  -- CONSTRAINT title_role FOREIGN KEY (role_id) REFERENCES title_role(id) ON DELETE CASCADE,
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
    (title, salary)
VALUES
    ('Scouting Team', 30000),
    ('Thief', 50000),
    ('Student', 35000),
    ('Professor', 75000),
    ('Trapper', 60000),
    ('Bounty Hunter', 80000),
    ('Headmaster', 95000),
    ('Marksman', 90000);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Noctis', 'Caelum', 1, NULL),
    ('Prompto', 'Argentum', 2, 1),
    ('Lunafreya', 'Fleuret', 3, 1),
    ('Ardyn', 'Izunia', 4, NULL),
    ('Gladiolus', 'Amicitia', 5, 1),
    ('Ignis', 'Scientia', 6, 1),
    ('Ravus', 'Fleuret', 7, 1),
    ('Regis', 'Lucis', 8, NULL);


SELECT * FROM employee_trackerDB.employee;

SELECT * FROM employee_trackerDB.title_role;

SELECT * FROM employee_trackerDB.department;