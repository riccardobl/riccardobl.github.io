#!/bin/bash

userUID=`id -u`
groupUID=`id -g`

if [ "$ARGS" = "" ];
then
    if [ "$HEADLESS" = "" ];
    then
        export ARGS="$ARGS -it"
    fi
fi


if [ "$RUNTIME" = "" ];
then
    if [ "`which podman`" != "" ];then  
        export RUNTIME="podman"
    else
        export RUNTIME="docker"
        if [ "$SUDO_USER" != "" ];
        then
            userUID=`id -u $SUDO_USER`
            groupUID=`id -g $SUDO_USER`
        fi
        ARGS="$ARGS -u=$userUID:$groupUID"
    fi
fi

function render() { 
    file=$1
    dir=`dirname $file`
    out=$file.png
    echo "Render $file ( $dir ) in $out"
    $RUNTIME run -v$dir:$dir -w$dir \
    --entrypoint /usr/bin/node \
    $ARGS \
    -it --rm riccardoblb/p5js-docker-renderer \
    /app/main.js  --sketch $file --out $out

}
export -f render

find $(pwd)  -type f -name "*.p5js.js" -exec /bin/bash -c 'render "$0"' {} \;
