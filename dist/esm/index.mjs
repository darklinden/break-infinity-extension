function padEnd(str, maxLength, fillString) {
    let result = String(str);
    let targetLen = typeof maxLength === 'number'
        ? maxLength
        : parseInt(maxLength, 10);
    if (isNaN(targetLen) || !isFinite(targetLen)) {
        return result;
    }
    let length = result.length;
    if (length >= targetLen) {
        return result;
    }
    if (!fillString || !fillString.length) {
        return result;
    }
    let filled = fillString;
    let fillLen = targetLen - length;
    while (filled.length < fillLen) {
        filled += filled;
    }
    let truncated = filled.length > fillLen ? filled.substring(0, fillLen) : filled;
    return result + truncated;
}
const MAX_SIGNIFICANT_DIGITS = 17;
const EXP_LIMIT = 9e15;
const NUMBER_EXP_MAX = 308;
const NUMBER_EXP_MIN = -324;
const ROUND_TOLERANCE = 1e-10;
const powerOf10 = (() => {
    const powersOf10 = [];
    for (let i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
        powersOf10.push(Number("1e" + i));
    }
    const indexOf0InPowersOf10 = 323;
    return (power) => powersOf10[power + indexOf0InPowersOf10];
})();
const D = (value) => value instanceof Decimal ? value : new Decimal(value);
const ME = (mantissa, exponent) => new Decimal().fromMantissaExponent(mantissa, exponent);
const ME_NN = (mantissa, exponent) => new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
function affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
    const actualStart = priceStart.mul(priceRatio.pow(currentOwned));
    return Decimal.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10()
        / priceRatio.log10());
}
function sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
    return priceStart
        .mul(priceRatio.pow(currentOwned))
        .mul(Decimal.sub(1, priceRatio.pow(numItems)))
        .div(Decimal.sub(1, priceRatio));
}
function affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
    const actualStart = priceStart.add(currentOwned.mul(priceAdd));
    const b = actualStart.sub(priceAdd.div(2));
    const b2 = b.pow(2);
    return b.neg()
        .add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt())
        .div(priceAdd)
        .floor();
}
function sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
    const actualStart = priceStart.add(currentOwned.mul(priceAdd));
    return numItems
        .div(2)
        .mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
}
function efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
    return cost.div(currentRpS).add(cost.div(deltaRpS));
}
export default class Decimal {
    constructor(value) {
        this.mantissa = NaN;
        this.exponent = NaN;
        if (value === undefined) {
            this.m = 0;
            this.e = 0;
        }
        else if (value instanceof Decimal) {
            this.fromDecimal(value);
        }
        else if (typeof value === "number") {
            this.fromNumber(value);
        }
        else {
            this.fromString(value);
        }
    }
    get m() {
        return this.mantissa;
    }
    set m(value) {
        this.mantissa = value;
    }
    get e() {
        return this.exponent;
    }
    set e(value) {
        this.exponent = value;
    }
    get s() {
        return this.sign();
    }
    set s(value) {
        if (value === 0) {
            this.e = 0;
            this.m = 0;
            return;
        }
        if (this.sgn() !== value) {
            this.m = -this.m;
        }
    }
    static fromMantissaExponent(mantissa, exponent) {
        return new Decimal().fromMantissaExponent(mantissa, exponent);
    }
    static fromMantissaExponent_noNormalize(mantissa, exponent) {
        return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
    }
    static fromDecimal(value) {
        return new Decimal().fromDecimal(value);
    }
    static fromNumber(value) {
        return new Decimal().fromNumber(value);
    }
    static fromString(value) {
        return new Decimal().fromString(value);
    }
    static fromValue(value) {
        return new Decimal().fromValue(value);
    }
    static fromValue_noAlloc(value) {
        return value instanceof Decimal ? value : new Decimal(value);
    }
    static abs(value) {
        return D(value).abs();
    }
    static neg(value) {
        return D(value).neg();
    }
    static negate(value) {
        return D(value).neg();
    }
    static negated(value) {
        return D(value).neg();
    }
    static sign(value) {
        return D(value).sign();
    }
    static sgn(value) {
        return D(value).sign();
    }
    static round(value) {
        return D(value).round();
    }
    static floor(value) {
        return D(value).floor();
    }
    static ceil(value) {
        return D(value).ceil();
    }
    static trunc(value) {
        return D(value).trunc();
    }
    static add(value, other) {
        return D(value).add(other);
    }
    static plus(value, other) {
        return D(value).add(other);
    }
    static sub(value, other) {
        return D(value).sub(other);
    }
    static subtract(value, other) {
        return D(value).sub(other);
    }
    static minus(value, other) {
        return D(value).sub(other);
    }
    static mul(value, other) {
        return D(value).mul(other);
    }
    static multiply(value, other) {
        return D(value).mul(other);
    }
    static times(value, other) {
        return D(value).mul(other);
    }
    static div(value, other) {
        return D(value).div(other);
    }
    static divide(value, other) {
        return D(value).div(other);
    }
    static recip(value) {
        return D(value).recip();
    }
    static reciprocal(value) {
        return D(value).recip();
    }
    static reciprocate(value) {
        return D(value).reciprocate();
    }
    static cmp(value, other) {
        return D(value).cmp(other);
    }
    static compare(value, other) {
        return D(value).cmp(other);
    }
    static eq(value, other) {
        return D(value).eq(other);
    }
    static equals(value, other) {
        return D(value).eq(other);
    }
    static neq(value, other) {
        return D(value).neq(other);
    }
    static notEquals(value, other) {
        return D(value).notEquals(other);
    }
    static lt(value, other) {
        return D(value).lt(other);
    }
    static lte(value, other) {
        return D(value).lte(other);
    }
    static gt(value, other) {
        return D(value).gt(other);
    }
    static gte(value, other) {
        return D(value).gte(other);
    }
    static max(value, other) {
        return D(value).max(other);
    }
    static min(value, other) {
        return D(value).min(other);
    }
    static clamp(value, min, max) {
        return D(value).clamp(min, max);
    }
    static clampMin(value, min) {
        return D(value).clampMin(min);
    }
    static clampMax(value, max) {
        return D(value).clampMax(max);
    }
    static cmp_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
    }
    static compare_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
    }
    static eq_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
    }
    static equals_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
    }
    static neq_tolerance(value, other, tolerance) {
        return D(value).neq_tolerance(other, tolerance);
    }
    static notEquals_tolerance(value, other, tolerance) {
        return D(value).notEquals_tolerance(other, tolerance);
    }
    static lt_tolerance(value, other, tolerance) {
        return D(value).lt_tolerance(other, tolerance);
    }
    static lte_tolerance(value, other, tolerance) {
        return D(value).lte_tolerance(other, tolerance);
    }
    static gt_tolerance(value, other, tolerance) {
        return D(value).gt_tolerance(other, tolerance);
    }
    static gte_tolerance(value, other, tolerance) {
        return D(value).gte_tolerance(other, tolerance);
    }
    static log10(value) {
        return D(value).log10();
    }
    static absLog10(value) {
        return D(value).absLog10();
    }
    static pLog10(value) {
        return D(value).pLog10();
    }
    static log(value, base) {
        return D(value).log(base);
    }
    static log2(value) {
        return D(value).log2();
    }
    static ln(value) {
        return D(value).ln();
    }
    static logarithm(value, base) {
        return D(value).logarithm(base);
    }
    static pow10(value) {
        if (Number.isInteger(value)) {
            return ME_NN(1, value);
        }
        return ME(Math.pow(10, value % 1), Math.trunc(value));
    }
    static pow(value, other) {
        if (typeof value === "number" && value === 10 && typeof other === "number" && Number.isInteger(other)) {
            return ME_NN(1, other);
        }
        return D(value).pow(other);
    }
    static exp(value) {
        return D(value).exp();
    }
    static sqr(value) {
        return D(value).sqr();
    }
    static sqrt(value) {
        return D(value).sqrt();
    }
    static cube(value) {
        return D(value).cube();
    }
    static cbrt(value) {
        return D(value).cbrt();
    }
    static dp(value) {
        return D(value).dp();
    }
    static decimalPlaces(value) {
        return D(value).dp();
    }
    static affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        return affordGeometricSeries(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
    }
    static sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
        return sumGeometricSeries(numItems, D(priceStart), D(priceRatio), currentOwned);
    }
    static affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        return affordArithmeticSeries(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
    }
    static sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
        return sumArithmeticSeries(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
    }
    static efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
        return efficiencyOfPurchase(D(cost), D(currentRpS), D(deltaRpS));
    }
    static randomDecimalForTesting(absMaxExponent) {
        if (Math.random() * 20 < 1) {
            return ME_NN(0, 0);
        }
        let mantissa = Math.random() * 10;
        if (Math.random() * 10 < 1) {
            mantissa = Math.round(mantissa);
        }
        mantissa *= Math.sign(Math.random() * 2 - 1);
        const exponent = Math.floor(Math.random() * absMaxExponent * 2) - absMaxExponent;
        return ME(mantissa, exponent);
    }
    normalize() {
        if (this.m >= 1 && this.m < 10) {
            return this;
        }
        if (this.m === 0) {
            this.m = 0;
            this.e = 0;
            return this;
        }
        const tempExponent = Math.floor(Math.log10(Math.abs(this.m)));
        this.m = tempExponent === NUMBER_EXP_MIN ?
            this.m * 10 / 1e-323 :
            this.m / powerOf10(tempExponent);
        this.e += tempExponent;
        return this;
    }
    fromMantissaExponent(mantissa, exponent) {
        if (!isFinite(mantissa) || !isFinite(exponent)) {
            mantissa = Number.NaN;
            exponent = Number.NaN;
            return this;
        }
        this.m = mantissa;
        this.e = exponent;
        this.normalize();
        return this;
    }
    fromMantissaExponent_noNormalize(mantissa, exponent) {
        this.m = mantissa;
        this.e = exponent;
        return this;
    }
    fromDecimal(value) {
        this.m = value.m;
        this.e = value.e;
        return this;
    }
    fromNumber(value) {
        if (isNaN(value)) {
            this.m = Number.NaN;
            this.e = Number.NaN;
        }
        else if (value === Number.POSITIVE_INFINITY) {
            this.m = 1;
            this.e = EXP_LIMIT;
        }
        else if (value === Number.NEGATIVE_INFINITY) {
            this.m = -1;
            this.e = EXP_LIMIT;
        }
        else if (value === 0) {
            this.m = 0;
            this.e = 0;
        }
        else {
            this.e = Math.floor(Math.log10(Math.abs(value)));
            this.m = this.e === NUMBER_EXP_MIN ?
                value * 10 / 1e-323 :
                value / powerOf10(this.e);
            this.normalize();
        }
        return this;
    }
    fromString(value) {
        if (value.indexOf("e") !== -1) {
            const parts = value.split("e");
            this.m = parseFloat(parts[0]);
            this.e = parseFloat(parts[1]);
            this.normalize();
        }
        else if (value === "NaN") {
            this.m = Number.NaN;
            this.e = Number.NaN;
        }
        else {
            this.fromNumber(parseFloat(value));
            if (isNaN(this.m)) {
                throw Error("[DecimalError] Invalid argument: " + value);
            }
        }
        return this;
    }
    fromValue(value) {
        if (value instanceof Decimal) {
            return this.fromDecimal(value);
        }
        if (typeof value === "number") {
            return this.fromNumber(value);
        }
        if (typeof value === "string") {
            return this.fromString(value);
        }
        this.m = 0;
        this.e = 0;
        return this;
    }
    toNumber() {
        if (!isFinite(this.e)) {
            return Number.NaN;
        }
        if (this.e > NUMBER_EXP_MAX) {
            return this.m > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
        }
        if (this.e < NUMBER_EXP_MIN) {
            return 0;
        }
        if (this.e === NUMBER_EXP_MIN) {
            return this.m > 0 ? 5e-324 : -5e-324;
        }
        const result = this.m * powerOf10(this.e);
        if (!isFinite(result) || this.e < 0) {
            return result;
        }
        const resultRounded = Math.round(result);
        if (Math.abs(resultRounded - result) < ROUND_TOLERANCE) {
            return resultRounded;
        }
        return result;
    }
    mantissaWithDecimalPlaces(places) {
        if (isNaN(this.m) || isNaN(this.e)) {
            return Number.NaN;
        }
        if (this.m === 0) {
            return 0;
        }
        const len = places + 1;
        const numDigits = Math.ceil(Math.log10(Math.abs(this.m)));
        const rounded = Math.round(this.m * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
        return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
    }
    toString() {
        if (isNaN(this.m) || isNaN(this.e)) {
            return "NaN";
        }
        if (this.e >= EXP_LIMIT) {
            return this.m > 0 ? "Infinity" : "-Infinity";
        }
        if (this.e <= -EXP_LIMIT || this.m === 0) {
            return "0";
        }
        if (this.e < 21 && this.e > -7) {
            return this.toNumber().toString();
        }
        return this.m + "e" + (this.e >= 0 ? "+" : "") + this.e;
    }
    isNaN() {
        return isNaN(this.m) || isNaN(this.e);
    }
    isInfinity() {
        return (this.e >= EXP_LIMIT);
    }
    toExponential(places) {
        if (isNaN(this.m) || isNaN(this.e)) {
            return "NaN";
        }
        if (this.e >= EXP_LIMIT) {
            return this.m > 0 ? "Infinity" : "-Infinity";
        }
        if (this.e <= -EXP_LIMIT || this.m === 0) {
            return "0" + (places > 0 ? padEnd(".", places + 1, "0") : "") + "e+0";
        }
        if (this.e > NUMBER_EXP_MIN && this.e < NUMBER_EXP_MAX) {
            return this.toNumber().toExponential(places);
        }
        if (!isFinite(places)) {
            places = MAX_SIGNIFICANT_DIGITS;
        }
        const len = places + 1;
        const numDigits = Math.max(1, Math.ceil(Math.log10(Math.abs(this.m))));
        const rounded = Math.round(this.m * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
        return rounded.toFixed(Math.max(len - numDigits, 0)) + "e" + (this.e >= 0 ? "+" : "") + this.e;
    }
    toFixed(places) {
        if (isNaN(this.m) || isNaN(this.e)) {
            return "NaN";
        }
        if (this.e >= EXP_LIMIT) {
            return this.m > 0 ? "Infinity" : "-Infinity";
        }
        if (this.e <= -EXP_LIMIT || this.m === 0) {
            return "0" + (places > 0 ? padEnd(".", places + 1, "0") : "");
        }
        if (this.e >= MAX_SIGNIFICANT_DIGITS) {
            let tmp = this.m.toString();
            tmp = tmp.replace('.', '');
            tmp = padEnd(tmp, this.e + 1, '0');
            tmp += (places > 0 ? padEnd(".", places + 1, "0") : "");
            return tmp;
        }
        return this.toNumber().toFixed(places);
    }
    toPrecision(places) {
        if (this.e <= -7) {
            return this.toExponential(places - 1);
        }
        if (places > this.e) {
            return this.toFixed(places - this.e - 1);
        }
        return this.toExponential(places - 1);
    }
    valueOf() {
        return this.toString();
    }
    toJSON() {
        return this.toString();
    }
    toStringWithDecimalPlaces(places) {
        return this.toExponential(places);
    }
    abs() {
        return ME_NN(Math.abs(this.m), this.e);
    }
    neg() {
        return ME_NN(-this.m, this.e);
    }
    negate() {
        return this.neg();
    }
    negated() {
        return this.neg();
    }
    sign() {
        return Math.sign(this.m);
    }
    sgn() {
        return this.sign();
    }
    round() {
        if (this.e < -1) {
            return new Decimal(0);
        }
        if (this.e < MAX_SIGNIFICANT_DIGITS) {
            return new Decimal(Math.round(this.toNumber()));
        }
        return this;
    }
    floor() {
        if (this.e < -1) {
            return Math.sign(this.m) >= 0 ? new Decimal(0) : new Decimal(-1);
        }
        if (this.e < MAX_SIGNIFICANT_DIGITS) {
            return new Decimal(Math.floor(this.toNumber()));
        }
        return this;
    }
    ceil() {
        if (this.e < -1) {
            return Math.sign(this.m) > 0 ? new Decimal(1) : new Decimal(0);
        }
        if (this.e < MAX_SIGNIFICANT_DIGITS) {
            return new Decimal(Math.ceil(this.toNumber()));
        }
        return this;
    }
    trunc() {
        if (this.e < 0) {
            return new Decimal(0);
        }
        if (this.e < MAX_SIGNIFICANT_DIGITS) {
            return new Decimal(Math.trunc(this.toNumber()));
        }
        return this;
    }
    add(value) {
        const decimal = D(value);
        if (this.m === 0) {
            return decimal;
        }
        if (decimal.m === 0) {
            return this;
        }
        let biggerDecimal;
        let smallerDecimal;
        if (this.e >= decimal.e) {
            biggerDecimal = this;
            smallerDecimal = decimal;
        }
        else {
            biggerDecimal = decimal;
            smallerDecimal = this;
        }
        if (biggerDecimal.e - smallerDecimal.e > MAX_SIGNIFICANT_DIGITS) {
            return biggerDecimal;
        }
        const mantissa = Math.round(1e14 * biggerDecimal.m +
            1e14 * smallerDecimal.m * powerOf10(smallerDecimal.e - biggerDecimal.e));
        return ME(mantissa, biggerDecimal.e - 14);
    }
    plus(value) {
        return this.add(value);
    }
    sub(value) {
        return this.add(D(value).neg());
    }
    subtract(value) {
        return this.sub(value);
    }
    minus(value) {
        return this.sub(value);
    }
    mul(value) {
        if (typeof value === "number") {
            if (value < 1e307 && value > -1e307) {
                return ME(this.m * value, this.e);
            }
            return ME(this.m * 1e-307 * value, this.e + 307);
        }
        const decimal = typeof value === "string" ? new Decimal(value) : value;
        return ME(this.m * decimal.m, this.e + decimal.e);
    }
    multiply(value) {
        return this.mul(value);
    }
    times(value) {
        return this.mul(value);
    }
    div(value) {
        return this.mul(D(value).recip());
    }
    divide(value) {
        return this.div(value);
    }
    divideBy(value) {
        return this.div(value);
    }
    dividedBy(value) {
        return this.div(value);
    }
    recip() {
        return ME(1 / this.m, -this.e);
    }
    reciprocal() {
        return this.recip();
    }
    reciprocate() {
        return this.recip();
    }
    cmp(value) {
        const decimal = D(value);
        if (this.m === 0) {
            if (decimal.m === 0) {
                return 0;
            }
            if (decimal.m < 0) {
                return 1;
            }
            if (decimal.m > 0) {
                return -1;
            }
        }
        if (decimal.m === 0) {
            if (this.m < 0) {
                return -1;
            }
            if (this.m > 0) {
                return 1;
            }
        }
        if (this.m > 0) {
            if (decimal.m < 0) {
                return 1;
            }
            if (this.e > decimal.e) {
                return 1;
            }
            if (this.e < decimal.e) {
                return -1;
            }
            if (this.m > decimal.m) {
                return 1;
            }
            if (this.m < decimal.m) {
                return -1;
            }
            return 0;
        }
        if (this.m < 0) {
            if (decimal.m > 0) {
                return -1;
            }
            if (this.e > decimal.e) {
                return -1;
            }
            if (this.e < decimal.e) {
                return 1;
            }
            if (this.m > decimal.m) {
                return 1;
            }
            if (this.m < decimal.m) {
                return -1;
            }
            return 0;
        }
        throw Error("Unreachable code");
    }
    compare(value) {
        return this.cmp(value);
    }
    eq(value) {
        const decimal = D(value);
        return this.e === decimal.e && this.m === decimal.m;
    }
    equals(value) {
        return this.eq(value);
    }
    neq(value) {
        return !this.eq(value);
    }
    notEquals(value) {
        return this.neq(value);
    }
    lt(value) {
        const decimal = D(value);
        if (this.m === 0) {
            return decimal.m > 0;
        }
        if (decimal.m === 0) {
            return this.m <= 0;
        }
        if (this.e === decimal.e) {
            return this.m < decimal.m;
        }
        if (this.m > 0) {
            return decimal.m > 0 && this.e < decimal.e;
        }
        return decimal.m > 0 || this.e > decimal.e;
    }
    lte(value) {
        return !this.gt(value);
    }
    gt(value) {
        const decimal = D(value);
        if (this.m === 0) {
            return decimal.m < 0;
        }
        if (decimal.m === 0) {
            return this.m > 0;
        }
        if (this.e === decimal.e) {
            return this.m > decimal.m;
        }
        if (this.m > 0) {
            return decimal.m < 0 || this.e > decimal.e;
        }
        return decimal.m < 0 && this.e < decimal.e;
    }
    gte(value) {
        return !this.lt(value);
    }
    max(value) {
        const decimal = D(value);
        return this.lt(decimal) ? decimal : this;
    }
    min(value) {
        const decimal = D(value);
        return this.gt(decimal) ? decimal : this;
    }
    clamp(min, max) {
        return this.max(min).min(max);
    }
    clampMin(min) {
        return this.max(min);
    }
    clampMax(max) {
        return this.min(max);
    }
    cmp_tolerance(value, tolerance) {
        const decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    }
    compare_tolerance(value, tolerance) {
        return this.cmp_tolerance(value, tolerance);
    }
    eq_tolerance(value, tolerance) {
        const decimal = D(value);
        return Decimal.lte(this.sub(decimal).abs(), Decimal.max(this.abs(), decimal.abs()).mul(tolerance));
    }
    equals_tolerance(value, tolerance) {
        return this.eq_tolerance(value, tolerance);
    }
    neq_tolerance(value, tolerance) {
        return !this.eq_tolerance(value, tolerance);
    }
    notEquals_tolerance(value, tolerance) {
        return this.neq_tolerance(value, tolerance);
    }
    lt_tolerance(value, tolerance) {
        const decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    }
    lte_tolerance(value, tolerance) {
        const decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    }
    gt_tolerance(value, tolerance) {
        const decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    }
    gte_tolerance(value, tolerance) {
        const decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    }
    log10() {
        return this.e + Math.log10(this.m);
    }
    absLog10() {
        return this.e + Math.log10(Math.abs(this.m));
    }
    pLog10() {
        return this.m <= 0 || this.e < 0 ? 0 : this.log10();
    }
    log(base) {
        return (Math.LN10 / Math.log(base)) * this.log10();
    }
    log2() {
        return 3.321928094887362 * this.log10();
    }
    ln() {
        return 2.302585092994045 * this.log10();
    }
    logarithm(base) {
        return this.log(base);
    }
    pow(value) {
        const numberValue = value instanceof Decimal ? value.toNumber() : value;
        const temp = this.e * numberValue;
        let newMantissa;
        if (Number.isSafeInteger(temp)) {
            newMantissa = Math.pow(this.m, numberValue);
            if (isFinite(newMantissa) && newMantissa !== 0) {
                return ME(newMantissa, temp);
            }
        }
        const newExponent = Math.trunc(temp);
        const residue = temp - newExponent;
        newMantissa = Math.pow(10, numberValue * Math.log10(this.m) + residue);
        if (isFinite(newMantissa) && newMantissa !== 0) {
            return ME(newMantissa, newExponent);
        }
        const result = Decimal.pow10(numberValue * this.absLog10());
        if (this.sign() === -1) {
            if (Math.abs(numberValue % 2) === 1) {
                return result.neg();
            }
            else if (Math.abs(numberValue % 2) === 0) {
                return result;
            }
            return new Decimal(Number.NaN);
        }
        return result;
    }
    pow_base(value) {
        return D(value).pow(this);
    }
    factorial() {
        const n = this.toNumber() + 1;
        return Decimal.pow((n / Math.E) * Math.sqrt(n * Math.sinh(1 / n) + 1 /
            (810 * Math.pow(n, 6))), n).mul(Math.sqrt(2 * Math.PI / n));
    }
    exp() {
        const x = this.toNumber();
        if (-706 < x && x < 709) {
            return Decimal.fromNumber(Math.exp(x));
        }
        return Decimal.pow(Math.E, x);
    }
    sqr() {
        return ME(Math.pow(this.m, 2), this.e * 2);
    }
    sqrt() {
        if (this.m < 0) {
            return new Decimal(Number.NaN);
        }
        if (this.e % 2 !== 0) {
            return ME(Math.sqrt(this.m) * 3.16227766016838, Math.floor(this.e / 2));
        }
        return ME(Math.sqrt(this.m), Math.floor(this.e / 2));
    }
    cube() {
        return ME(Math.pow(this.m, 3), this.e * 3);
    }
    cbrt() {
        let sign = 1;
        let mantissa = this.m;
        if (mantissa < 0) {
            sign = -1;
            mantissa = -mantissa;
        }
        const newMantissa = sign * Math.pow(mantissa, 1 / 3);
        const mod = this.e % 3;
        if (mod === 1 || mod === -1) {
            return ME(newMantissa * 2.154434690031883, Math.floor(this.e / 3));
        }
        if (mod !== 0) {
            return ME(newMantissa * 4.641588833612778, Math.floor(this.e / 3));
        }
        return ME(newMantissa, Math.floor(this.e / 3));
    }
    sinh() {
        return this.exp().sub(this.negate().exp()).div(2);
    }
    cosh() {
        return this.exp().add(this.negate().exp()).div(2);
    }
    tanh() {
        return this.sinh().div(this.cosh());
    }
    asinh() {
        return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
    }
    acosh() {
        return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
    }
    atanh() {
        if (this.abs().gte(1)) {
            return Number.NaN;
        }
        return Decimal.ln(this.add(1).div(new Decimal(1).sub(this))) / 2;
    }
    ascensionPenalty(ascensions) {
        if (ascensions === 0) {
            return this;
        }
        return this.pow(Math.pow(10, -ascensions));
    }
    egg() {
        return this.add(9);
    }
    lessThanOrEqualTo(other) {
        return this.cmp(other) < 1;
    }
    lessThan(other) {
        return this.cmp(other) < 0;
    }
    greaterThanOrEqualTo(other) {
        return this.cmp(other) > -1;
    }
    greaterThan(other) {
        return this.cmp(other) > 0;
    }
    decimalPlaces() {
        return this.dp();
    }
    dp() {
        if (!isFinite(this.mantissa)) {
            return NaN;
        }
        if (this.exponent >= MAX_SIGNIFICANT_DIGITS) {
            return 0;
        }
        const mantissa = this.mantissa;
        let places = -this.exponent;
        let e = 1;
        while (Math.abs(Math.round(mantissa * e) / e - mantissa) > ROUND_TOLERANCE) {
            e *= 10;
            places++;
        }
        return places > 0 ? places : 0;
    }
    static get MAX_VALUE() {
        return MAX_VALUE;
    }
    static get MIN_VALUE() {
        return MIN_VALUE;
    }
    static get NUMBER_MAX_VALUE() {
        return NUMBER_MAX_VALUE;
    }
    static get NUMBER_MIN_VALUE() {
        return NUMBER_MIN_VALUE;
    }
}
const MAX_VALUE = ME_NN(1, EXP_LIMIT);
const MIN_VALUE = ME_NN(1, -EXP_LIMIT);
const NUMBER_MAX_VALUE = D(Number.MAX_VALUE);
const NUMBER_MIN_VALUE = D(Number.MIN_VALUE);
//# sourceMappingURL=index.js.map