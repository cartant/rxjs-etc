/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { asapScheduler, EMPTY } from "rxjs";
import { isNotNullish, isNullish, isObservable, isScheduler } from "./util";

describe("util", () => {

    describe("isNotNullish", () => {

        it("should determine whether a value is not nullish", () => {

            expect(isNotNullish(null)).to.be.false;
            expect(isNotNullish(undefined)).to.be.false;
            expect(isNotNullish(false)).to.be.true;
            expect(isNotNullish(0)).to.be.true;
            expect(isNotNullish("")).to.be.true;
        });
    });

    describe("isNullish", () => {

        it("should determine whether a value is nullish", () => {

            expect(isNullish(null)).to.be.true;
            expect(isNullish(undefined)).to.be.true;
            expect(isNullish(false)).to.be.false;
            expect(isNullish(0)).to.be.false;
            expect(isNullish("")).to.be.false;
        });
    });

    describe("isObservable", () => {

        it("should determine whether a value is an observable", () => {

            expect(isObservable(null)).to.be.false;
            expect(isObservable(undefined)).to.be.false;
            expect(isObservable({})).to.be.false;
            expect(isObservable(EMPTY)).to.be.true;
        });
    });

    describe("isScheduler", () => {

        it("should determine whether a value is a scheduler", () => {

            expect(isScheduler(null)).to.be.false;
            expect(isScheduler(undefined)).to.be.false;
            expect(isScheduler({})).to.be.false;
            expect(isScheduler(asapScheduler)).to.be.true;
        });
    });
});
