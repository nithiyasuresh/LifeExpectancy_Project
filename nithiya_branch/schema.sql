CREATE TABLE country (
country TEXT,
	country_id INT not NULL,
	PRIMARY KEY(country_id)
);

CREATE TABLE year (
year INT PRIMARY KEY
);

CREATE TABLE life_expectancy (
	life_id INT not null,
	le_country_id INT not null,
	le_year_id INT not null,
	FOREIGN KEY (le_country_id) REFERENCES country(country_id),
	FOREIGN KEY (le_year_id) REFERENCES year(year),
	life_expectancy FLOAT not null,
	GDP FLOAT not null,
	population FLOAT not null,
	adult_mortality FLOAT not null,
	HIV_AIDS FLOAT not null,
	polio FLOAT not null,
	measles FLOAT not null,
	hepatitis_B FLOAT not null,
	PRIMARY KEY (life_id)
);