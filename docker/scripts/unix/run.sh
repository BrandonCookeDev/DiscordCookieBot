#!/bin/bash

CURDIR=$(pwd)
BASEDIR=$(dirname $0)
IMAGE_NAME=$(cat $BASEDIR/../ImageName.txt)

echo Running Docker container $IMAGE_NAME

cd $BASEDIR/../../..
cmd="docker run $@ -it $IMAGE_NAME"
echo $cmd
$cmd
cd $CURDIR