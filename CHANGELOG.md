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