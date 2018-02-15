/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
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
    "rxjs/observable/never": "Rx.Observable",
    "rxjs/observable/of": "Rx.Observable",
    "rxjs/observable/timer": "Rx.Observable",
    "rxjs/observable/using": "Rx.Observable",
    "rxjs/observable/zip": "Rx.Observable",
    "rxjs/operator/let": "Rx.Observable.prototype",
    "rxjs/operators/concat": "Rx.operators",
    "rxjs/operators/concatMap": "Rx.operators",
    "rxjs/operators/debounceTime": "Rx.operators",
    "rxjs/operators/delay": "Rx.operators",
    "rxjs/operators/dematerialize": "Rx.operators",
    "rxjs/operators/distinctUntilChanged": "Rx.operators",
    "rxjs/operators/do": "Rx.operators",
    "rxjs/operators/filter": "Rx.operators",
    "rxjs/operators/isEmpty": "Rx.operators",
    "rxjs/operators/last": "Rx.operators",
    "rxjs/operators/map": "Rx.operators",
    "rxjs/operators/mapTo": "Rx.operators",
    "rxjs/operators/materialize": "Rx.operators",
    "rxjs/operators/merge": "Rx.operators",
    "rxjs/operators/mergeMap": "Rx.operators",
    "rxjs/operators/multicast": "Rx.operators",
    "rxjs/operators/pluck": "Rx.operators",
    "rxjs/operators/publish": "Rx.operators",
    "rxjs/operators/scan": "Rx.operators",
    "rxjs/operators/startWith": "Rx.operators",
    "rxjs/operators/switchMap": "Rx.operators",
    "rxjs/operators/take": "Rx.operators",
    "rxjs/operators/takeLast": "Rx.operators",
    "rxjs/operators/takeUntil": "Rx.operators",
    "rxjs/operators/takeWhile": "Rx.operators",
    "rxjs/operators/tap": "Rx.operators",
    "rxjs/operators/toArray": "Rx.operators",
    "rxjs/operators/toPromise": "Rx.operators",
    "rxjs/ReplaySubject": "Rx",
    "rxjs/scheduler/asap": "Rx.Scheduler",
    "rxjs/Subject": "Rx",
    "rxjs/Subscriber": "Rx",
    "rxjs/Subscription": "Rx",
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
        throw new Error(`Found an unshimmed require in ${path}.\nTo find the offending import, search in the bundle for "rxjs/".`);
    }
}
