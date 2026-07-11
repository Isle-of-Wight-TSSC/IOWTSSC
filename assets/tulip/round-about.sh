#!/usr/bin/env bash
#set variables
#word=$(head -c 11 sha.txt)
#sha=$(head -c 11 sha.txt  | sha256sum)
#OF='output/'$word'.svg'
OF='arm.svg'
echo  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' > $OF
echo  '<g id="arm"><line style="stroke: black; fill: none;" x1="10" y1="10" x2="10" y2="18"/></g>' >> $OF
echo  '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="18" r="1"/>' >> $OF
echo  '<path style="fill: none; stroke: rgb(0, 0, 0);" d="M 8 4 L 10 2 L 12 4" transform="rotate('$(($1*30))' 10 10)"></path>' >> $OF
for i in $@; do
  echo '<use href="#arm" transform="rotate('$((($i+6)*30))' 10 10)" />' >> $OF
done
echo '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="10" r="3"/>  <path style="fill: none; stroke: rgb(255, 255, 255);" d="M 10 10 L 13 13"/></svg>' >> $OF