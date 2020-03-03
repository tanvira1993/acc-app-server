

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  project_id int NOT NULL,
  gl_id int NOT NULL,
  trans_type varchar(500) NOT NULL,
  amount int NOT NULL,
  description varchar(500) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;


CREATE TABLE gl (
  gl_id SERIAL PRIMARY KEY,
  project_id int NOT NULL,
  gl_name varchar(200) NOT NULL,
  gl_desc varchar(500) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;



CREATE TABLE incomes (
  income_id SERIAL PRIMARY KEY,
  project_id int NOT NULL,
  gl_id int NOT NULL,
  trans_type varchar(500) NOT NULL,
  amount int NOT NULL,
  description varchar(500) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;


CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name varchar(200) NOT NULL,
  project_desc varchar(500) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT NULL
) ;

