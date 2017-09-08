# rxjs-etc

[![NPM version](https://img.shields.io/npm/v/rxjs-etc.svg)](https://www.npmjs.com/package/rxjs-etc)
[![Build status](https://img.shields.io/travis/cartant/rxjs-etc.svg)](http://travis-ci.org/cartant/rxjs-etc)
[![dependency status](https://img.shields.io/david/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=peerDependencies)

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/jZB4ja6SvwGUN4ibgYVgUVYV/cartant/rxjs-etc'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/jZB4ja6SvwGUN4ibgYVgUVYV/cartant/rxjs-etc.svg' /></a>

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

### Static methods for `Observable`

* [combineLatestArray](./source/observable/combineLatestArray.ts)
* [concatArray](./source/observable/concatArray.ts)
* [forkJoinArray](./source/observable/forkJoinArray.ts)
* [mergeArray](./source/observable/mergeArray.ts)
* [zipArray](./source/observable/zipArray.ts)

    A bunch of static methods that behave in a predictable manner when passed empty arrays. Some of these are now redundant, but some aren't.

    To see how these methods behave, consult their tests.

### Instance methods for `Observable`

* [doIndex](./source/operator/doIndex.ts)

    Like [`do`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do), but it receives an index in addition to the emitted value.

### Functions for use with `let`

A bunch of functions that can be passed to the `let` operator. Use them like this:

    source.let(endWith("this is the end"))

* [debounceAfter](./source/let/debounceAfter.ts)

    Debounce the source observable, but only after the notifier emits a value.

* [defaultObservableIfEmpty](./source/let/defaultObservableIfEmpty.ts)

    Like [`defaultIfEmpty`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty), but it takes a default observable instead of a default value.

* [endWith](./source/let/endWith.ts)

    Like [`startWith`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith), but for the other end.

* [guard](./source/let/guard.ts)

    Applies the specified TypeScript guard to change the source observable's type and perform a runtime check. Emits an error notification if the guard rejects a value.

* [pluck](./source/let/pluck.ts)

    Like [`pluck`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck), but it's type-safe and only lets you pass a single, valid key. And it returns the appropriate type.

* [rateLimit](./source/let/rateLimit.ts)

    A rate limiter with pass through when waiting is not necessary.

* [takeWhileInclusive](./source/let/takeWhileInclusive.ts)

    Like [`takeWhile`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile), but the value that fails the predicate is taken.

* [throttleAfter](./source/let/throttleAfter.ts)

    Throttle the source observable, but only after the notifier emits a value.

### Utility functions

A bunch of utility functions that do what their names suggest:

* [isObservable](./source/util.ts)
* [isScheduler](./source/util.ts)