#!/usr/bin/env bash
# set variables

for x in $@; do
  OF+=$x'_'
done
OF=$(echo $OF | head -c $((${#OF}-1)))
OF+='.svg'
echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' > "$OF"
echo '<g id="arm"><line style="stroke: black; fill: none;" x1="10" y1="10" x2="10" y2="18"/></g>' >> "$OF"
echo '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="18" r="1"/>' >> "$OF"

mode=$1
rotation_multiplier=1
rotation_offset=180
case "$mode" in
  r|m|j|t)
      rotation_multiplier=1
      rotation_offset=180
    ;;
  R|M|J|T)
      rotation_multiplier=30
      rotation_offset=6
    ;;
  *)
    ;;
esac

echo $rotation_multiplier
echo $rotation_offset

echo '<path style="fill: none; stroke: rgb(0, 0, 0);" d="M 8 4 L 10 2 L 12 4" transform="rotate('$(($2 * rotation_multiplier))' 10 10)"></path>' >> "$OF"
echo $(( $2 * rotation_multiplier ))

for i in "${@:2}"; do
  if [ "$i" = "R" ] || [ "$i" = "M" ] || [ "$i" = "J" ]; then
    echo $i
  else
    echo '<use href="#arm" transform="rotate('$(((i + rotation_offset) * rotation_multiplier))' 10 10)" />' >> "$OF"
    echo $(((i + rotation_offset) * rotation_multiplier))
  fi
done

if [ "$1" = "R" ]|| [ "$1" = "r" ]; then
  echo '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="10" r="3"/><path style="fill: none; stroke: rgb(255, 255, 255);" d="M 10 10 L 13 13"/></svg>' >> "$OF"
elif [ "$1" = "M" ]|| [ "$1" = "m" ]; then
  echo '<circle style="stroke: rgb(0, 0, 0); stroke-width: 1; fill: white;" cx="10" cy="10" r="1"/></svg>' >> "$OF"
elif [ "$1" = "J" ]|| [ "$1" = "j" ]; then
  echo '</svg>' >> "$OF"
elif [ "$1" = "T" ]|| [ "$1" = "t" ]; then
  echo '<text x="3" y="18" font-size="7">🚦</text></svg>' >> "$OF"
fi