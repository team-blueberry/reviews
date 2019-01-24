CREATE TABLE IF NOT EXISTS reviews (
reviewId INT PRIMARY KEY,
date VARCHAR,
helpful INT,
images VARCHAR,
name VARCHAR,
pageId INT,
profilepicture VARCHAR,
stars DECIMAL,
text VARCHAR,
title VARCHAR,
username VARCHAR,
verified BOOLEAN
);
