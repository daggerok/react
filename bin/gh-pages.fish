#!/usr/bin/fish

npm i; npm run build
sed -i -e 's/^\/dist$/#\/dist/g' .gitignore
touch dist/.nojekyll
echo "script: echo test" > dist/.travis.yml
cp -Rf dist/index.html dist/404.html
cp -Rf README.md .gitignore dist/
git add .
git commit --amend --no-edit
git push origin (git subtree split --prefix=dist --onto=origin/gh-pages):gh-pages --force
git rm -r dist --cached
sed -i -e 's/^#\/dist$/\/dist/g' .gitignore
git add .
git commit --amend --no-edit
git push origin purecss-webpack1 --force
