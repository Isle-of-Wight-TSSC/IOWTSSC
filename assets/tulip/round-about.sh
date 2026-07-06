#!/usr/bin/env bash
#set variables
#word=$(head -c 11 sha.txt)
#sha=$(head -c 11 sha.txt  | sha256sum)
#OF='output/'$word'.svg'
OF='arm.svg'
echo  '<?xml version="1.0" encoding="utf-8"?><svg height="190" width="162" xmlns="http://www.w3.org/2000/svg">' > $OF
echo  '<g id="arm"><line style="stroke: black; fill: none;" x1="50" y1="10" x2="50" y2="50"/><line style="stroke: black; fill: none;" x1="40" y1="10" x2="60" y2="10"/><polyline style="stroke: black; fill: none;" points="40 10 50 10 50 0" transform="rotate(45 50 10)"/></g>' >> $OF
for i in  {0..360..10}; do
  echo '
  <use href="#arm" transform="rotate('$i' 50 50)" />' >> $OF
done
echo '</svg>' >> $OF
