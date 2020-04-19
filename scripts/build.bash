#! /usr/bin/env bash
HTML="<ol>"
for challenge in [0-9]*/; do
  DIR_NAME=$(echo $challenge | sed -r 's/([[:digit:]]{2}) - (.*)\//\1-\L\2/g' | sed -r 's/\s/-/g')
  HTML="$HTML
  <li>
    <a href='./$DIR_NAME/'>$challenge</a>
  </li>
  "
  mkdir -p build/$DIR_NAME
  cp -r "$challenge." build/$DIR_NAME
done
HTML="$HTML
</ol>"

cp static/* build/
sed -i -e "/<body>/a $(echo $HTML)" build/index.html
