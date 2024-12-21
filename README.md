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

```

# Start scenario 1

```sh
# configure nx release in nx.json
# (see 'release' in nx.json )

# configure nx-release-publish target options in nx.json (ex, to specify npm dist tag to be used)
# (see 'targetDefaults.nx-release-publish.options' in nx.json)

# start local verdaccio registry
npx nx local-registry

# add a file to lib-c
touch libs/lib-c/src/feature-1.txt

# commit the file
git add lib/lib-c/src/feature-2.txt
git commit -m 'feat: add feature 1'

# release (dry-run)
npx nx release --dry-run

# release
npx nx release
```

# Start scenario 2

(continue on scenario 1)

```sh
# add executor options to each project.json to ensure the output path is updated to the root dist folder
# (see 'targets.build.options' in each project.json for libs)

# update nx release config to use the generated package.json files in dist/{projectRoot} for versioning
# (see release.version.generatorOptions.packageRoot )

# update nx-release-publish executor options to publish from the new dist directories
# (see targetDefaults.nx-release-publish.options in nx.json)

# build
npx nx run-many --target build

# add a file to lib-c
touch libs/lib-c/src/feature-2.txt

# commit the file
git add lib/lib-c/src/feature-2.txt
git commit -m 'feat: add feature 2'

# release (dry-run)
npx nx release --dry-run

# release
npx nx release

```

The generated package.json for lib-c still contains local dependency protocols which cannot be published.

```json
{
  "name": "@thdk/lib-c",
  "version": "0.4.0",
  "dependencies": {
    "@thdk/lib-a": "file:../lib-a",
    "@thdk/lib-b": "file:../lib-b",
    "tslib": "^2.3.0"
  },
  "type": "commonjs",
  "main": "./src/index.js",
  "typings": "./src/index.d.ts",
  "files": ["src", "!**/*.tsbuildinfo"],
  "nx": {
    "sourceRoot": "libs/lib-c/src",
    "projectType": "library",
    "name": "lib-c"
  },
  "types": "./src/index.d.ts"
}
```

```sh
# add a file to lib-a
touch libs/lib-a/src/feature-1.txt

# commit the file
git add lib/lib-a/src/feature-1.txt
git commit -m 'feat(lib-a): add feature 1'


# release (dry-run)
npx nx release --dry-run

# release
npx nx release

```

the updates to generated package.json files look like:

```diff
UPDATE dist/libs/lib-a/package.json

    "name": "@thdk/lib-a",
-   "version": "0.1.0",
+   "version": "0.2.0",
    "dependencies": {

  }
+

UPDATE dist/libs/lib-c/package.json

    "name": "@thdk/lib-c",
-   "version": "0.3.0",
+   "version": "0.4.1",
    "dependencies": {
-     "@thdk/lib-a": "file:../lib-a",
+     "@thdk/lib-a": "0.2.0",
      "@thdk/lib-b": "file:../lib-b",

  }
+
```

Here the local dependency protocal was correctly replaced but only for the libs that got bumped.
