CREATE TABLE IF NOT EXISTS userData (
	user_id SERIAL PRIMARY KEY, -- identifier for the user
	firstName VARCHAR(10),
	lastName VARCHAR(10),
	birthday DATE,
	city VARCHAR(20),
	state VARCHAR(20),
	zip VARCHAR(5),
	email VARCHAR(40),
	password VARCHAR(16),
	bio VARCHAR(400), -- user provided bio for their profile
	ability smallint, -- 0 for beginner, 1 for intermediate, 2 for expert
	status smallint, -- 0 for rider, 1 for driver, 2 for both
	img VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS ratings (


);

CREATE TABLE IF NOT EXISTS messages (

);

CREATE TABLE IF NOT EXISTS posts (

);

INSERT INTO userData(user_id,firstName,lastName,birthday,city,state,zip,email,password,bio,ability,status,img)
Values(1,'Eben','Fluto','20000824','Arvada','Colorado','80007','ebfl1466@colorado.edu','password','My name is jonas',0,2,'');
