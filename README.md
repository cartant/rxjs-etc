# rxjs-etc

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cartant/rxjs-etc/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/rxjs-etc.svg)](https://www.npmjs.com/package/rxjs-etc)
[![Build status](https://img.shields.io/travis/cartant/rxjs-etc.svg)](http://travis-ci.org/cartant/rxjs-etc)
[![dependency status](https://img.shields.io/david/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc)
[![devDependency Status](https://img.shields.io/david/dev/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/rxjs-etc.svg)](https://david-dm.org/cartant/rxjs-etc#info=peerDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/cartant/rxjs-etc.svg)](https://greenkeeper.io/)

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

### `Observable` factories

* [combineLatestArray](./source/observable/combineLatestArray.ts), [concatArray](./source/observable/concatArray.ts), [forkJoinArray](./source/observable/forkJoinArray.ts), [mergeArray](./source/observable/mergeArray.ts), [zipArray](./source/observable/zipArray.ts)

    A bunch of static methods that behave in a predictable manner when passed empty arrays. Some of these are now redundant, but some aren't.

    To see how these methods behave, consult their tests.

* [combineLatestObject](./source/observable/combineLatestObject.ts), [forkJoinObject](./source/observable/forkJoinObject.ts)

    Like the array versions, but these take objects. Observable properties are combined using either `combineLatest` or `forkJoin`.

* [forkJoinConcurrent](./source/observable/forkJoinConcurrent.ts)

    Like `forkJoin` but only runs the specified number of observables concurrently.

* [traverse](./source/observable/traverse.ts)

    Based on `expand`. Traverses a graph with backpressure applied using either a notifier or a consumer.

* [zipPadded](./source/observable/zipPadded.ts)

    Works like `zipArray`, but if some sources complete whilst others continue to emit values, those the complete are 'padded' with the specified `padValue` (which defaults to `undefined`).

### Instance methods for `Observable`

* [doIndex](./source/operator/doIndex.ts)

    Like [`do`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do), but it receives an index in addition to the emitted value.

### Functions for use with `pipe` or `let`

A bunch of functions that can be passed to the `let` operator. Use them like this:

    source.let(endWith("this is the end"))

They can also be used with `pipe`, like this:

    source.pipe(endWith("this is the end"))

* [debounceAfter](./source/operators/debounceAfter.ts)

    Debounce the source observable, but only after the notifier emits a value.

* [debounceTimeSubsequent](./source/operators/debounceTimeSubsequent.ts)

    Debounce the source observable, but don't debounce the first `count` notifications - only the subsequent notifications.

* [defaultObservableIfEmpty](./source/operators/defaultObservableIfEmpty.ts)

    Like [`defaultIfEmpty`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty), but it takes a default observable instead of a default value.

* [endWith](./source/operators/endWith.ts)

    Like [`startWith`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith), but for the other end.

* [guard](./source/operators/guard.ts)

    Applies the specified TypeScript guard to change the source observable's type and perform a runtime check. Emits an error notification if the guard rejects a value.

* [inexorably](./source/operators/inexorably.ts)

    Like `finalize` (which is also exported as an alias), but passes the callback the `Notification` that effected the teardown, or `undefined` if explicitly unsubscribed.

* [initial](./source/operators/initial.ts)

    Apply the operator to the source observable, but select only the initial `count` notifications - don't select the subsequent notifications.

* [pluck](./source/operators/pluck.ts)

    Like [`pluck`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck), but it's type-safe and only lets you valid keys. And it returns the appropriate type.

* [prioritize](./source/operators/prioritize.ts)

    When creating signals from a source observable - for use with operators that take a notifier, like `buffer` and `window` - the order in which subscriptions are made is important. `prioritize` can be used to ensure that the notifier subscribes to the source first.

* [rateLimit](./source/operators/rateLimit.ts)

    A rate limiter with pass through when waiting is not necessary.

* [refCountAuditTime](./source/operators/refCountAuditTime.ts)

    Can be used with a `ConnectableObservable` instead of `refCount`. Works kinda like [`auditTime`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-auditTime) does for values, but for unsubscriptions instead. That is, when the reference count drops to zero, it waits the specified duration and then if the reference count is zero, it unsubscribes. If the reference count is incremented within the duration, no unsubscription occurs.

* [reschedule](./source/operators/reschedule.ts)

    Emits values using the specified scheduler.

* [subsequent](./source/operators/subsequent.ts)

    Apply the operator to the source observable, but don't select the first `count` notifications - only the subsequent notifications.

* [takeWhileInclusive](./source/operators/takeWhileInclusive.ts)

    Like [`takeWhile`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeWhile), but the value that fails the predicate is taken.

* [tapIndex](./source/operators/tagIndex.ts)

    Like [`tap`](https://github.com/ReactiveX/rxjs/blob/5.5.2/src/operators/tap.ts#L54-L60), but it receives an index in addition to the emitted value. (Note that `tap` is the lettable/pipeable version of the `do` operator. It was renamed because `do` is a keyword.)

* [throttleAfter](./source/operators/throttleAfter.ts)

    Throttle the source observable, but only after the notifier emits a value.

* [unsubscribeOn](./source/operators/unsubscribeOn.ts)

    Like [`subscribeOn`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-subscribeOn), but for unsubscription.

### Utility functions

A bunch of utility functions that do what their names suggest:

* [isObservable](./source/util.ts)
* [isScheduler](./source/util.ts)