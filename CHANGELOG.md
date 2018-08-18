<a name="8.1.1"></a>
## [8.1.1](https://github.com/cartant/rxjs-etc/compare/v8.1.0...v8.1.1) (2018-07-18)

### Fixes

* Added `combineLatestHigherOrder` to the index. ([ba4b026](https://github.com/cartant/rxjs-etc/commit/ba4b026))

<a name="8.1.0"></a>
## [8.1.0](https://github.com/cartant/rxjs-etc/compare/v8.0.0...v8.1.0) (2018-07-18)

### Features

* Added the `combineLatestHigherOrder` factory function. ([ba4b026](https://github.com/cartant/rxjs-etc/commit/ba4b026))

<a name="8.0.0"></a>
## [8.0.0](https://github.com/cartant/rxjs-etc/compare/v7.4.0...v8.0.0) (2018-07-20)

### Breaking Changes

* Renamed the `tapIndex` operator to `tapWithIndex` and used a tuple so that either handler functions or a partial observer can be passed. ([a1f9af4](https://github.com/cartant/rxjs-etc/commit/a1f9af4))

<a name="7.4.0"></a>
## [7.4.0](https://github.com/cartant/rxjs-etc/compare/v7.3.0...v7.4.0) (2018-07-16)

### Features

* Added the `indexElements` operator. ([435cd47](https://github.com/cartant/rxjs-etc/commit/435cd47))
* Added the `toggle` factory function. ([3cb7e4f](https://github.com/cartant/rxjs-etc/commit/3cb7e4f))

### Fixes

* Fixed the TypeScript overloads the static `genericPipe`/`pipe` helper. ([d42a7bb](https://github.com/cartant/rxjs-etc/commit/d42a7bb))

<a name="7.3.0"></a>
## [7.3.0](https://github.com/cartant/rxjs-etc/compare/v7.2.1...v7.3.0) (2018-06-06)

### Features

* Added `isNullish`/`isNotNullish` helpers. ([1d50d2e](https://github.com/cartant/rxjs-etc/commit/1d50d2e))
* Added `debounceTimeWithinReason`. ([5009619](https://github.com/cartant/rxjs-etc/commit/5009619))
* Added `hasCompleted`. ([dfeab10](https://github.com/cartant/rxjs-etc/commit/dfeab10))
* Added `separate`. ([6135b05](https://github.com/cartant/rxjs-etc/commit/6135b05))

<a name="7.2.1"></a>
## [7.2.1](https://github.com/cartant/rxjs-etc/compare/v7.2.0...v7.2.1) (2018-05-20)

### Fixes

* Improve the type safety of the static `genericPipe`/`pipe` helper. ([a52491e](https://github.com/cartant/rxjs-etc/commit/a52491e))

<a name="7.2.0"></a>
## [7.2.0](https://github.com/cartant/rxjs-etc/compare/v7.1.0...v7.2.0) (2018-05-20)

### Features

* Added the static `genericPipe`/`pipe` helper. ([239cfd1](https://github.com/cartant/rxjs-etc/commit/239cfd1))

<a name="7.1.0"></a>
## [7.1.0](https://github.com/cartant/rxjs-etc/compare/v7.0.0...v7.1.0) (2018-05-19)

### Features

* Added the `inexorably`/`finalize` operator. ([e0e6ed0](https://github.com/cartant/rxjs-etc/commit/e0e6ed0))

<a name="7.0.0"></a>
## [7.0.0](https://github.com/cartant/rxjs-etc/compare/v6.4.0...v7.0.0) (2018-05-12)

### Breaking Changes

* Refactor `traverse` to use an `options` parameter. ([07f9812](https://github.com/cartant/rxjs-etc/commit/07f9812))

<a name="6.4.0"></a>
## [6.4.0](https://github.com/cartant/rxjs-etc/compare/v6.3.0...v6.4.0) (2018-05-10)

### Features

* **initial**: Add `initial` - the reverse of the `subsequent` operator. ([c5a0b84](https://github.com/cartant/rxjs-etc/commit/c5a0b84))

<a name="6.3.0"></a>
## [6.3.0](https://github.com/cartant/rxjs-etc/compare/v6.2.0...v6.3.0) (2018-05-05)

### Features

* Added the `unsubscribeOn` operator. ([5200eee](https://github.com/cartant/rxjs-etc/commit/5200eee))

<a name="6.2.0"></a>
## [6.2.0](https://github.com/cartant/rxjs-etc/compare/v6.1.0...v6.2.0) (2018-05-04)

### Features

* Added the `instanceOf` operator and the `queue` helper.

<a name="6.1.0"></a>
## [6.1.0](https://github.com/cartant/rxjs-etc/compare/v6.0.0...v6.1.0) (2018-05-03)

### Features

* Added `combineLatestObject` and `forkJoinObject`.

<a name="6.0.0"></a>
## [6.0.0](https://github.com/cartant/rxjs-etc/compare/v5.0.1...v6.0.0) (2018-04-25)

### Breaking Changes

* Upgrade to RxJS version 6.
* Rename the UMD global to `rxjsEtc`.

<a name="5.0.1"></a>
## [5.0.1](https://github.com/cartant/rxjs-etc/compare/v5.0.0...v5.0.1) (2018-04-11)

### Fixes

* **traverse**: The `NotificationQueue` no longer overrides the internal `_subscribe` method. ([1341b26](https://github.com/cartant/rxjs-etc/commit/1341b26))

<a name="5.0.0"></a>
## [5.0.0](https://github.com/cartant/rxjs-etc/compare/v4.2.0...v5.0.0) (2018-04-02)

### Breaking Changes

* **traverse**: A notification is now required for the traversal of the first node/page. ([4b7bed2](https://github.com/cartant/rxjs-etc/commit/4b7bed2))

<a name="4.2.0"></a>
## [4.2.0](https://github.com/cartant/rxjs-etc/compare/v4.1.1...v4.2.0) (2018-04-01)

### Features

* **traverse**: Add `traverse` observable.

<a name="4.1.1"></a>
## [4.1.1](https://github.com/cartant/rxjs-etc/compare/v4.1.0...v4.1.1) (2018-02-21)

### Bug Fixes

* **forkJoinConcurrent**: Fixed the sort order of the emitted array. ([b34ffcc](https://github.com/cartant/rxjs-etc/commit/b34ffcc))
* Fixed a number of tests that were incorrect and were running.

### Build

* Switch to Webpack.

<a name="4.1.0"></a>
## [4.1.0](https://github.com/cartant/rxjs-etc/compare/v4.0.0...v4.1.0) (2018-02-15)

### Features

* **subsequent**: Split out `subsequent` from within the `debounceTimeSubsequent` operator. ([6112da1](https://github.com/cartant/rxjs-etc/commit/6112da1))

<a name="4.0.0"></a>
## [4.0.0](https://github.com/cartant/rxjs-etc/compare/v3.3.0...v4.0.0) (2018-02-14)

### Breaking Changes

* The distribution now includes CommonJS, ES5 and ES2015 versions of the package.
* The `jsnext:main` entry point has been removed from the `package.json` and an `es2015` entry point has been added for the ES2015 files.
* The `let` directory has been renamed to `operators`.

<a name="3.3.0"></a>
## [3.3.0](https://github.com/cartant/rxjs-etc/compare/v3.2.0...v3.3.0) (2018-02-14)

### Features

* **debounceTimeSubsequent**: Add `debounceTimeSubsequent` for situations in which the first notification should not be debounced. ([1d771c9](https://github.com/cartant/rxjs-etc/commit/1d771c9))

<a name="3.2.0"></a>
## [3.2.0](https://github.com/cartant/rxjs-etc/compare/v3.1.1...v3.2.0) (2018-01-28)

### Features

* **pluck**: Support nested keys. ([04d1766](https://github.com/cartant/rxjs-etc/commit/04d1766))
* **reschedule**: Force notifications to be emitted using a specifed scheduler. ([97a583e](https://github.com/cartant/rxjs-etc/commit/97a583e))
* **zipPadded**: Pads observables that complete whilst others continue to emit. ([d671b95](https://github.com/cartant/rxjs-etc/commit/d671b95))
* **forkJoinConcurrent**: Like `forkJoin`, but with a maximum concurrency. ([026f0ed](https://github.com/cartant/rxjs-etc/commit/026f0ed))

<a name="3.1.1"></a>
## [3.1.1](https://github.com/cartant/rxjs-etc/compare/v3.1.0...v3.1.1) (2017-11-29)

### Bug Fixes

* **prioritize**: Support synchronous sources. ([a5f09b4](https://github.com/cartant/rxjs-etc/commit/a5f09b4))

<a name="3.1.0"></a>
## [3.1.0](https://github.com/cartant/rxjs-etc/compare/v3.0.0...v3.1.0) (2017-10-22)

### Features

* **tapIndex**: Add a lettable/pipeable equivalent to `doIndex`. ([0b76d5b](https://github.com/cartant/rxjs-etc/commit/0b76d5b))

<a name="3.0.0"></a>
## [3.0.0](https://github.com/cartant/rxjs-etc/compare/v2.0.2...v3.0.0) (2017-10-20)

### Breaking Changes

* **RxJS**: The implementations now use lettable/pipeable operators, so a minimum version of 5.5 is required. ([48fca3a](https://github.com/cartant/rxjs-etc/commit/48fca3a))

<a name="2.0.2"></a>
## [2.0.2](https://github.com/cartant/rxjs-etc/compare/v2.0.1...v2.0.2) (2017-09-12)

### Non-breaking Changes

* **guard**: Remove unnecessary type assertion. ([7fce3b5](https://github.com/cartant/rxjs-etc/commit/7fce3b5))

### Build

* Update dependencies.

<a name="2.0.1"></a>
## [2.0.1](https://github.com/cartant/rxjs-etc/compare/v2.0.0...v2.0.1) (2017-08-13)

### Bug Fixes

* **takeWhileInclusive**: Filter values that pass the predicate when concatenating, so that the last value is not repeated if the source completes without a value failing the predicate. ([08a60a9](https://github.com/cartant/rxjs-etc/commit/08a60a9))

<a name="2.0.0"></a>
## [2.0.0](https://github.com/cartant/rxjs-etc/compare/v1.1.0...v2.0.0) (2017-08-11)

### Breaking Changes

* **let**: Remove patching of `Observable` prototype from within the `let` methods. ([25a8db8](https://github.com/cartant/rxjs-etc/commit/25a8db8))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/cartant/rxjs-etc/compare/v1.0.1...v1.1.0) (2017-07-24)

### Features

* **guard**: Add optional message. ([e714d9a](https://github.com/cartant/rxjs-etc/commit/e714d9a))
* **pluck**: Add type-aware `pluck`. ([3cd4379](https://github.com/cartant/rxjs-etc/commit/3cd4379))

### Non-breaking Changes

* **defaultObservableIfEmpty**: Refactor to remove `do`. ([9596d62](https://github.com/cartant/rxjs-etc/commit/9596d62))