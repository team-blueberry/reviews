#!/usr/bin/env bash

d="$(date +"%Y-%m-%d_%Hh%Mm%S")"
mkdir "results/$d"

path="results/$d"

artillery run -o $path/report-1rps.json random-endpoint-1rps.yml
sleep .5
artillery run -o $path/report-10rps.json random-endpoint-10rps.yml
sleep .5
artillery run -o $path/report-100rps.json random-endpoint-100rps.yml
sleep .5
artillery run -o $path/report-1000rps.json random-endpoint-1000rps.yml