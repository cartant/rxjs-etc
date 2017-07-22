# rxjs-etc

[![NPM version](https://img.shields.io/npm/v/rxjs-etc.svg)](https://www.npmjs.com/package/rxjs-etc)
[![Build status](https://img.shields.io/travis/cartant/rxjs-etc.svg)](http://travis-ci.org/cartant/rxjs-etc)
[![dependency status](https://img.shields.io/david/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=peerDependencies)

### What is it?

A bunch of observables and operators for RxJS.

### Why might you need it?

I created this package as a place to put additional RxJS observables, operators and methods. If you are looking for something that's not in the RxJS distribution, there might be something suitable in here - if you're lucky.

## Install

Install the package using NPM:

```
npm install rxjs-etc --save
```

## What's in it?

### Static Methods

* [combineLatestArray](./blob/master/source/observable/combineLatestArray.ts)
* [concatArray](./blob/master/source/observable/concatArray.ts)
* [forkJoinArray](./blob/master/source/observable/forkJoinArray.ts)
* [mergeArray](./blob/master/source/observable/mergeArray.ts)
* [zipArray](./blob/master/source/observable/zipArray.ts)

    A bunch of static methods that behave in a predictable manner when passed empty arrays. Some of these are now redundant, but some aren't.

### Methods

* [doIndex](./blob/master/source/operator/doIndex.ts)

    Like [`do`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do), but it receives an index in addition to the emitted value.

### Functions for use with `let`

A bunch of functions that can be passed to the `let` operator. Writing these is much simpler than writing an operator.

Use them like this:

    source.let(endWith("this is the end"))

* [debounceAfter](./blob/master/source/let/debounceAfter.ts)

    Debounce the source observable, but only after the notifier emits a value.

* [defaultObservableIfEmpty](./blob/master/source/let/defaultObservableIfEmpty.ts)

    Like [`defaultIfEmpty`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty), but it takes a default observable instead of a default value.

* [endWith](./blob/master/source/let/endWith.ts)

    Like [`startWith`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith), but for the other end.

* [guard](./blob/master/source/let/guard.ts)

    Applies the specified TypeScript guard to change the source observable's type and perform a runtime check. Throws an error if the guard rejects a value.

* [rateLimit](./blob/master/source/let/rateLimit.ts)

    A rate limiter with pass through when wating is not necessary.

* [takeWhileInclusive](./blob/master/source/let/takeWhileInclusive.ts)

    Like [`takeWhile`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile), but the emitted value that fails the predicate is included.

* [throttleAfter](./blob/master/source/let/throttleAfter.ts)

    Throttle the source observable, but only after the notifier emits a value.

### Utilities

A bunch of utilities that do what their names suggest:

* [isObservable](./blob/master/source/util.ts)
* [isScheduler](./blob/master/source/util.ts)