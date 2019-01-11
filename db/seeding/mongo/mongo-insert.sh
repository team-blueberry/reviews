#!/usr/bin/env bash

mongo newReviews --eval "db.reviews.drop()"
sleep 5

mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out1.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out2.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out3.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out4.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out5.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out6.tsv
sleep 5
mongoimport --db newReviews --collection reviews --headerline --type tsv --file ../temp/out7.tsv