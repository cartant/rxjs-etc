/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { merge } from "rxjs/observable/merge";
import { of } from "rxjs/observable/of";
import { zip } from "rxjs/observable/zip";
import { concat } from "rxjs/operators/concat";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { map } from "rxjs/operators/map";
import { mapTo } from "rxjs/operators/mapTo";
import { publish } from "rxjs/operators/publish";
import { scan } from "rxjs/operators/scan";

export function zipPadded<T>(
    sources: Observable<T>[],
    padValue?: any
): Observable<T[]> {

    return Observable.create((observer: Observer<T[]>) => {

        const publishedSources = sources.map(
            source => source.pipe(publish()) as ConnectableObservable<T>
        );

        const indices = merge(...publishedSources.map(
            source => source.pipe(map((unused, index) => index))
        )).pipe(
            scan((max, index) => Math.max(max, index), 0),
            distinctUntilChanged(),
            publish()
        ) as ConnectableObservable<number>;

        const subscription = zip<T>(...publishedSources.map(
            source => source.pipe(concat(indices.pipe(mapTo(padValue))))
        )).subscribe(observer);

        subscription.add(indices.connect());
        publishedSources.forEach(
            source => subscription.add(source.connect())
        );
        return subscription;
    });
}
