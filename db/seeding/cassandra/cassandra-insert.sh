#!/bin/bash

echo "script unfinished"

exit 0

# Structure from http://jeremy.zawodny.com/blog/archives/010717.html

FAIL=0

echo "starting"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out2.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out3.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out4.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out5.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out6.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

cqlsh -e "USE reviews; COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '/Users/lucky_bloop/programming/hack-reactor/sdc/reviews-component/db/seeding/temp/out7.tsv' WITH DELIMITER='\t';" &

pidlist="$pidlist $!"

for job in $pidlist
do
    echo $job
    wait $job || let "FAIL+=1"
done

echo $FAIL

if [ "$FAIL" == "0" ];
then
    echo "YAY!"
else
    echo "FAIL! ($FAIL)"
fi