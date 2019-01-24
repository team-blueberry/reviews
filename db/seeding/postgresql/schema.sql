CREATE TABLE IF NOT EXISTS reviews(
id SERIAL PRIMARY KEY,
reviewId INT,
date VARCHAR(10),
helpful INT,
images VARCHAR(1500),
name VARCHAR(60),
pageId INT,
profilepicture VARCHAR(200),
stars NUMERIC,
text VARCHAR(12000),
title VARCHAR(120),
username VARCHAR(60),
verified BOOLEAN
);