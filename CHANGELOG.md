<a name="9.6.1"></a>
### [9.6.1](https://github.com/cartant/rxjs-etc/compare/v9.6.0...v9.6.1) (2019-05-28)

### Fixes

* Add `package.json` files for all directories that are import locations.

<a name="9.6.0"></a>
### [9.6.0](https://github.com/cartant/rxjs-etc/compare/v9.5.0...v9.6.0) (2019-05-17)

### Features

* Added the `tapSubscribe` operator. ([fd52583](https://github.com/cartant/rxjs-etc/commit/fd52583))

<a name="9.5.0"></a>
### [9.5.0](https://github.com/cartant/rxjs-etc/compare/v9.4.1...v9.5.0) (2019-04-23)

### Features

* Added `bucketBy` and `splitBy` operators. ([c43c56f](https://github.com/cartant/rxjs-etc/commit/c43c56f))

<a name="9.4.1"></a>
### [9.4.1](https://github.com/cartant/rxjs-etc/compare/v9.4.0...v9.4.1) (2019-04-05)

### Fixes

* Specify `"sideEffects": false` in the `package.json` file. ([28a8510](https://github.com/cartant/rxjs-etc/commit/28a8510))

<a name="9.4.0"></a>
### [9.4.0](https://github.com/cartant/rxjs-etc/compare/v9.3.1...v9.4.0) (2018-12-08)

### Features

* Added a `pause` operator. ([8496970](https://github.com/cartant/rxjs-etc/commit/8496970))
* Added `concatTap`, `exhaustTap`, `mergeTap` and `switchTap` operators. ([bb3ab78](https://github.com/cartant/rxjs-etc/commit/bb3ab78))

<a name="9.3.1"></a>
### [9.3.1](https://github.com/cartant/rxjs-etc/compare/v9.3.0...v9.3.1) (2018-11-18)

### Fixes

* Default the zone schedulers to using the `queueScheduler`. ([d6f79b0](https://github.com/cartant/rxjs-etc/commit/d6f79b0))

<a name="9.3.0"></a>
### [9.3.0](https://github.com/cartant/rxjs-etc/compare/v9.2.0...v9.3.0) (2018-10-28)

### Features

* Added a `spread` operator/helper. ([ebd0815](https://github.com/cartant/rxjs-etc/commit/ebd0815))

<a name="9.2.0"></a>
### [9.2.0](https://github.com/cartant/rxjs-etc/compare/v9.1.0...v9.2.0) (2018-10-13)

### Non-breaking Changes

* Renamed the `defaultObservableIfEmpty` operator to `concatIfEmpty` and deprecated the old name. ([dd9c876](https://github.com/cartant/rxjs-etc/commit/dd9c876))

<a name="9.1.0"></a>
### [9.1.0](https://github.com/cartant/rxjs-etc/compare/v9.0.0...v9.1.0) (2018-09-15)

### Features

* Added a `finalizeWithKind` operator. ([fe48dfd](https://github.com/cartant/rxjs-etc/commit/fe48dfd))

### Non-breaking Changes

* Deprecated `inexorably` in favour of `finalizeWithKind`. ([cfe9edf](https://github.com/cartant/rxjs-etc/commit/cfe9edf))

<a name="9.0.0"></a>
### [9.0.0](https://github.com/cartant/rxjs-etc/compare/v8.5.0...v9.0.0) (2018-08-28)

### Breaking Changes

* Removed `shareReplay`. It should be fixed in RxJS, instead. ([fb34d13](https://github.com/cartant/rxjs-etc/commit/fb34d13))

<a name="8.5.0"></a>
### [8.5.0](https://github.com/cartant/rxjs-etc/compare/v8.4.0...v8.5.0) (2018-08-27)

### Features

* Added a `shareReplay` implementation that unsubscribes if the reference count drops to zero.

<a name="8.4.0"></a>
### [8.4.0](https://github.com/cartant/rxjs-etc/compare/v8.3.2...v8.4.0) (2018-08-27)

### Changes

* Renamed `refCountAuditTime` to `refCountDelay` and deprecated the former.

### Features

* Added `bufferRecent`.
* Added `mergeHigherOrderArray`.
* Added `pairwiseStartWith`.
* Added `refCountForever`.

<a name="8.3.2"></a>
## [8.3.2](https://github.com/cartant/rxjs-etc/compare/v8.3.1...v8.3.2) (2018-08-21)

### Fixes

* Fixed a problem in which the implementations of  `combineLatestHigherOrder`/`combineLatestHigherOrderObject` closed over an internal, stale array. ([d6296bd](https://github.com/cartant/rxjs-etc/commit/d6296bd))

<a name="8.3.1"></a>
## [8.3.1](https://github.com/cartant/rxjs-etc/compare/v8.3.0...v8.3.1) (2018-08-20)

### Fixes

* With `combineLatestHigherOrder`/`combineLatestHigherOrderObject`, whenever the higher-order observable emits, if all of the sources have emitted a value, emit an array/object. This also means that if the array/object of sources emitted by the higher-order obserable is empty, an empty array/object is emitted. ([e93f650](https://github.com/cartant/rxjs-etc/commit/e93f650))

<a name="8.3.0"></a>
## [8.3.0](https://github.com/cartant/rxjs-etc/compare/v8.2.0...v8.3.0) (2018-08-19)

### Features

* Added the `combineLatestHigherOrderObject` factory function. ([78199bc](https://github.com/cartant/rxjs-etc/commit/78199bc))
* Added the `startWithTimeout` operator. ([667cb3c](https://github.com/cartant/rxjs-etc/commit/667cb3c))

### Fixes

* Supported multiple, synchronous subscribes in `refCountAuditTime`. ([ef95141](https://github.com/cartant/rxjs-etc/commit/ef95141))

<a name="8.2.0"></a>
## [8.2.0](https://github.com/cartant/rxjs-etc/compare/v8.1.1...v8.2.0) (2018-08-18)

### Features

* Added the `refCountOn` operator. ([fbc8b02](https://github.com/cartant/rxjs-etc/commit/fbc8b02))

<a name="8.1.1"></a>
## [8.1.1](https://github.com/cartant/rxjs-etc/compare/v8.1.0...v8.1.1) (2018-08-18)

### Fixes

* Added `combineLatestHigherOrder` to the index. ([ba4b026](https://github.com/cartant/rxjs-etc/commit/ba4b026))

<a name="8.1.0"></a>
## [8.1.0](https://github.com/cartant/rxjs-etc/compare/v8.0.0...v8.1.0) (2018-08-18)

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