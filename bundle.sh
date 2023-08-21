#!/bin/bash

src_path='./public/assets/javascripts/src'
dst_path='./public/assets/javascripts/dist'

cat $src_path/version.js \
    $src_path/locale.js \
    $src_path/keymaker.js \
    $src_path/conn.js \
    $src_path/ui-room-simple.js \
    > $dst_path/bundle.js

sha1_hash=$(shasum -a 1 $dst_path/bundle.js | awk '{print $1}')
sha1_hash_text="bundle-$sha1_hash"
sha1_bundle_filename="bundle-$sha1_hash.js"

rm $dst_path/bundle-*.js
mv $dst_path/bundle.js $dst_path/$sha1_bundle_filename

cp ./public/index.html.tpl ./public/index.html
sed -i '' "s/bundle/$sha1_hash_text/g" ./public/index.html
