INSERT INTO department (name)
VALUES
    ('Developers'),
    ('Management'),
    ('Service');
INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 100000.00, 2),
    ('Janitor', 35000.00, 3),
    ('Customer Service', 40000.00, 3),
    ('Jr Developer', 50000.00, 1),
    ('Sr Developer', 75000.00, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Donald',2, 2),
    ('Jon', 'Snow', 1, NULL),
    ('Doctor', 'Strange', 1, NULL),
    ('Ricky', 'Bobby', 2, 3),
    ('Biggie', 'Smalls', 4, 2),
    ('Snoop', 'Dogg', 4, 2),
    ('The', 'Hound', 1, NULL),
    ('Amy', 'Winehouse', 2, 7),
    ('General', 'Grevious', 2, 7),
    ('Chimera', 'Grey', 3, 3);