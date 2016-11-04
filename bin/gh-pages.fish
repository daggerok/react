#!/usr/bin/fish

sed -i -e 's/^\/dist$/#\/dist/g' .gitignore
echo "script: echo test" > dist/.travis.yml
cp -Rf src/index.html dist/index.html
cp -Rf src/index.html dist/404.html
cp -Rf README.md dist/
git add .
git commit --amend --no-edit
git push origin (git subtree split --prefix=dist --onto=origin/master):master --force
git rm -r dist --cached
sed -i -e 's/^#\/dist$/\/dist/g' .gitignore
git add .
git commit --amend --no-edit
git push origin react-in-html --force
