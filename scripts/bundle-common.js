/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

"use strict";

const browserify = require("browserify");
const fs = require("fs");

const shims = {
    "rxjs/add/operator/let": "Rx.unused",
    "rxjs/BehaviorSubject": "Rx",
    "rxjs/Notification": "Rx",
    "rxjs/Observable": "Rx",
    "rxjs/observable/combineLatest": "Rx.Observable",
    "rxjs/observable/concat": "Rx.Observable",
    "rxjs/observable/defer": "Rx.Observable",
    "rxjs/observable/empty": "Rx.Observable",
    "rxjs/observable/from": "Rx.Observable",
    "rxjs/observable/forkJoin": "Rx.Observable",
    "rxjs/observable/merge": "Rx.Observable",
    "rxjs/observable/of": "Rx.Observable",
    "rxjs/observable/zip": "Rx.Observable",
    "rxjs/operator/concat": "Rx.Observable.prototype",
    "rxjs/operator/concatMap": "Rx.Observable.prototype",
    "rxjs/operator/delay": "Rx.Observable.prototype",
    "rxjs/operator/dematerialize": "Rx.Observable.prototype",
    "rxjs/operator/distinctUntilChanged": "Rx.Observable.prototype",
    "rxjs/operator/do": "Rx.Observable.prototype",
    "rxjs/operator/filter": "Rx.Observable.prototype",
    "rxjs/operator/isEmpty": "Rx.Observable.prototype",
    "rxjs/operator/let": "Rx.Observable.prototype",
    "rxjs/operator/map": "Rx.Observable.prototype",
    "rxjs/operator/mapTo": "Rx.Observable.prototype",
    "rxjs/operator/materialize": "Rx.Observable.prototype",
    "rxjs/operator/merge": "Rx.Observable.prototype",
    "rxjs/operator/mergeMap": "Rx.Observable.prototype",
    "rxjs/operator/multicast": "Rx.Observable.prototype",
    "rxjs/operator/publish": "Rx.Observable.prototype",
    "rxjs/operator/scan": "Rx.Observable.prototype",
    "rxjs/operator/startWith": "Rx.Observable.prototype",
    "rxjs/operator/switchMap": "Rx.Observable.prototype",
    "rxjs/operator/take": "Rx.Observable.prototype",
    "rxjs/operator/takeLast": "Rx.Observable.prototype",
    "rxjs/operator/takeUntil": "Rx.Observable.prototype",
    "rxjs/operator/takeWhile": "Rx.Observable.prototype",
    "rxjs/operator/toArray": "Rx.Observable.prototype",
    "rxjs/operator/toPromise": "Rx.Observable.prototype",
    "rxjs/ReplaySubject": "Rx",
    "rxjs/scheduler/asap": "Rx.Scheduler",
    "rxjs/Subject": "Rx",
    "rxjs/Subscriber": "Rx",
    "rxjs/symbol/rxSubscriber": "Rx.Symbol"
};

module.exports = function (options) {

    const writeStream = fs.createWriteStream(options.bundle);

    let bundler = browserify({
        entries: options.entry,
        fullPaths: false,
        standalone: options.name
    });
    if (options.useGlobal) {
        bundler = bundler.transform(require("browserify-global-shim").configure(shims));
        writeStream.on("close", () => { verify(options.bundle); });
    }
    bundler.bundle().pipe(writeStream);
}

function verify(path) {

    const content = fs.readFileSync(path).toString();
    if (/require\s*\(\s*['"]rxjs/.test(content)) {
        throw new Error(`Found an unshimmed require in ${path}`);
    }
}
