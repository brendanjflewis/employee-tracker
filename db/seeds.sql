INSERT INTO department (name) VALUES ('Business Operations');
INSERT INTO role (title, salary, department_id) VALUES ('Director of Business Operations', '120000', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES  ('Ted', 'Lasso', 1);

INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO role (title, salary, department_id) VALUES ('UI Engineer', '80000', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES  ('Ted', 'Lasso', 2);

INSERT INTO department (name) VALUES ('Production');
INSERT INTO role (title, salary, department_id) VALUES ('Producer', '90000', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES  ('Ted', 'Lasso', 3);






--------------------------------
-- OLD CODE THAT DID NOT WORK 
--------------------------------
-- INSERT INTO department (name)
-- VALUES
-- ('Business Operations'),
-- ('Engineering'),
-- ('Game Design'),
-- ('Production'),
-- ('Publishing and Marketing'),
-- ('Information Technology');

-- INSERT INTO role (title, salary, department_id)
-- VALUES
-- ('Director of Business Operations', 120000, 1),
-- ('Recruiting Manager', 80000, 1),
-- ('Finance Manager', 75000, 1),
-- ('UI Engineer', 80000, 2),
-- ('Graphics Engineer', 70000, 2),
-- ('AI Designer', 75000, 3),
-- ('Senior Gameplay Designer', 900000, 3),
-- ('Producer', 100000, 4),
-- ('Brand Manager', 90000, 5),
-- ('Product Manager', 95000, 5),
-- ('Information Security Engineer', 80000, 6)
-- ('System Administrator', 97000, 6);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES 
-- ('Ted', 'Lasso', 1),
-- ('Aaron', 'Paul', 2),
-- ('Ash', 'Ketchum', 3),
-- ('Walter', 'White', 7),
-- ('Eren', 'Jaegar', 6);