# NxReleaseCcVersioningDifferentProjectRoot

```sh
# create workspace
npx create-nx-workspace nx-release-cc-versioning-different-project-root

# navigate to new workspace
cd nx-release-cc-versioning-different-project-root

# install nx and dependencies
npm install

npx nx g @nx/js:lib --directory libs/lib-a --name lib-a --publishable --import-path @thdk/lib-a
npx nx g @nx/js:lib --directory libs/lib-b --name lib-b --publishable --import-path @thdk/lib-b
npx nx g @nx/js:lib --directory libs/lib-c --name lib-c --publishable --import-path @thdk/lib-c

# update lockfile
npm install

# add `@thdk/lib-a` and `@thdk/lib-b` as dependencies for `@thdk/lib-c`.
npm install -w @thdk/lib-c @thdk/lib-a @thdk/lib-b --save-exact

# sync typescript project references
npx nx sync

# build (just for fun)
npx nx run-many --target build

# configure nx release in nx.json
# ...

# start local verdaccio registry
npx nx local-registry

# release (dry-run)
npx nx release --dry-run

# release
npx nx release
```
