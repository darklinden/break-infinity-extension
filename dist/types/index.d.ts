export declare type DecimalSource = Decimal | number | string;
export default class Decimal {
    get m(): number;
    set m(value: number);
    get e(): number;
    set e(value: number);
    get s(): number;
    set s(value: number);
    static fromMantissaExponent(mantissa: number, exponent: number): Decimal;
    static fromMantissaExponent_noNormalize(mantissa: number, exponent: number): Decimal;
    static fromDecimal(value: Decimal): Decimal;
    static fromNumber(value: number): Decimal;
    static fromString(value: string): Decimal;
    static fromValue(value: DecimalSource): Decimal;
    static fromValue_noAlloc(value: DecimalSource): Decimal;
    static abs(value: DecimalSource): Decimal;
    static neg(value: DecimalSource): Decimal;
    static negate(value: DecimalSource): Decimal;
    static negated(value: DecimalSource): Decimal;
    static sign(value: DecimalSource): number;
    static sgn(value: DecimalSource): number;
    static round(value: DecimalSource): Decimal;
    static floor(value: DecimalSource): Decimal;
    static ceil(value: DecimalSource): Decimal;
    static trunc(value: DecimalSource): Decimal;
    static add(value: DecimalSource, other: DecimalSource): Decimal;
    static plus(value: DecimalSource, other: DecimalSource): Decimal;
    static sub(value: DecimalSource, other: DecimalSource): Decimal;
    static subtract(value: DecimalSource, other: DecimalSource): Decimal;
    static minus(value: DecimalSource, other: DecimalSource): Decimal;
    static mul(value: DecimalSource, other: DecimalSource): Decimal;
    static multiply(value: DecimalSource, other: DecimalSource): Decimal;
    static times(value: DecimalSource, other: DecimalSource): Decimal;
    static div(value: DecimalSource, other: DecimalSource): Decimal;
    static divide(value: DecimalSource, other: DecimalSource): Decimal;
    static recip(value: DecimalSource): Decimal;
    static reciprocal(value: DecimalSource): Decimal;
    static reciprocate(value: DecimalSource): Decimal;
    static cmp(value: DecimalSource, other: DecimalSource): 0 | 1 | -1;
    static compare(value: DecimalSource, other: DecimalSource): 0 | 1 | -1;
    static eq(value: DecimalSource, other: DecimalSource): boolean;
    static equals(value: DecimalSource, other: DecimalSource): boolean;
    static neq(value: DecimalSource, other: DecimalSource): boolean;
    static notEquals(value: DecimalSource, other: DecimalSource): boolean;
    static lt(value: DecimalSource, other: DecimalSource): boolean;
    static lte(value: DecimalSource, other: DecimalSource): boolean;
    static gt(value: DecimalSource, other: DecimalSource): boolean;
    static gte(value: DecimalSource, other: DecimalSource): boolean;
    static max(value: DecimalSource, other: DecimalSource): Decimal;
    static min(value: DecimalSource, other: DecimalSource): Decimal;
    static clamp(value: DecimalSource, min: DecimalSource, max: DecimalSource): Decimal;
    static clampMin(value: DecimalSource, min: DecimalSource): Decimal;
    static clampMax(value: DecimalSource, max: DecimalSource): Decimal;
    static cmp_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): 0 | 1 | -1;
    static compare_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): 0 | 1 | -1;
    static eq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static equals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static neq_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static notEquals_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static lt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static lte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static gt_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static gte_tolerance(value: DecimalSource, other: DecimalSource, tolerance: DecimalSource): boolean;
    static log10(value: DecimalSource): number;
    static absLog10(value: DecimalSource): number;
    static pLog10(value: DecimalSource): number;
    static log(value: DecimalSource, base: number): number;
    static log2(value: DecimalSource): number;
    static ln(value: DecimalSource): number;
    static logarithm(value: DecimalSource, base: number): number;
    static pow10(value: number): Decimal;
    static pow(value: DecimalSource, other: number | Decimal): Decimal;
    static exp(value: DecimalSource): Decimal;
    static sqr(value: DecimalSource): Decimal;
    static sqrt(value: DecimalSource): Decimal;
    static cube(value: DecimalSource): Decimal;
    static cbrt(value: DecimalSource): Decimal;
    static dp(value: DecimalSource): number;
    static decimalPlaces(value: DecimalSource): number;
    static affordGeometricSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: number | Decimal): Decimal;
    static sumGeometricSeries(numItems: number | Decimal, priceStart: DecimalSource, priceRatio: DecimalSource, currentOwned: number | Decimal): Decimal;
    static affordArithmeticSeries(resourcesAvailable: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    static sumArithmeticSeries(numItems: DecimalSource, priceStart: DecimalSource, priceAdd: DecimalSource, currentOwned: DecimalSource): Decimal;
    static efficiencyOfPurchase(cost: DecimalSource, currentRpS: DecimalSource, deltaRpS: DecimalSource): Decimal;
    static randomDecimalForTesting(absMaxExponent: number): Decimal;
    mantissa: number;
    exponent: number;
    constructor(value?: DecimalSource);
    normalize(): this;
    fromMantissaExponent(mantissa: number, exponent: number): this;
    fromMantissaExponent_noNormalize(mantissa: number, exponent: number): this;
    fromDecimal(value: Decimal): this;
    fromNumber(value: number): this;
    fromString(value: string): this;
    fromValue(value?: DecimalSource): this;
    toNumber(): number;
    mantissaWithDecimalPlaces(places: number): number;
    toString(): string;
    isNaN(): boolean;
    isInfinity(): boolean;
    toExponential(places: number): string;
    toFixed(places: number): string;
    toPrecision(places: number): string;
    valueOf(): string;
    toJSON(): string;
    toStringWithDecimalPlaces(places: number): string;
    abs(): Decimal;
    neg(): Decimal;
    negate(): Decimal;
    negated(): Decimal;
    sign(): number;
    sgn(): number;
    round(): Decimal;
    floor(): Decimal;
    ceil(): Decimal;
    trunc(): Decimal;
    add(value: DecimalSource): Decimal;
    plus(value: DecimalSource): Decimal;
    sub(value: DecimalSource): Decimal;
    subtract(value: DecimalSource): Decimal;
    minus(value: DecimalSource): Decimal;
    mul(value: DecimalSource): Decimal;
    multiply(value: DecimalSource): Decimal;
    times(value: DecimalSource): Decimal;
    div(value: DecimalSource): Decimal;
    divide(value: DecimalSource): Decimal;
    divideBy(value: DecimalSource): Decimal;
    dividedBy(value: DecimalSource): Decimal;
    recip(): Decimal;
    reciprocal(): Decimal;
    reciprocate(): Decimal;
    cmp(value: DecimalSource): 0 | 1 | -1;
    compare(value: DecimalSource): 0 | 1 | -1;
    eq(value: DecimalSource): boolean;
    equals(value: DecimalSource): boolean;
    neq(value: DecimalSource): boolean;
    notEquals(value: DecimalSource): boolean;
    lt(value: DecimalSource): boolean;
    lte(value: DecimalSource): boolean;
    gt(value: DecimalSource): boolean;
    gte(value: DecimalSource): boolean;
    max(value: DecimalSource): Decimal;
    min(value: DecimalSource): Decimal;
    clamp(min: DecimalSource, max: DecimalSource): Decimal;
    clampMin(min: DecimalSource): Decimal;
    clampMax(max: DecimalSource): Decimal;
    cmp_tolerance(value: DecimalSource, tolerance: DecimalSource): 0 | 1 | -1;
    compare_tolerance(value: DecimalSource, tolerance: DecimalSource): 0 | 1 | -1;
    eq_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    equals_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    neq_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    notEquals_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    lt_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    lte_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    gt_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    gte_tolerance(value: DecimalSource, tolerance: DecimalSource): boolean;
    log10(): number;
    absLog10(): number;
    pLog10(): number;
    log(base: number): number;
    log2(): number;
    ln(): number;
    logarithm(base: number): number;
    pow(value: number | Decimal): Decimal;
    pow_base(value: DecimalSource): Decimal;
    factorial(): Decimal;
    exp(): Decimal;
    sqr(): Decimal;
    sqrt(): Decimal;
    cube(): Decimal;
    cbrt(): Decimal;
    sinh(): Decimal;
    cosh(): Decimal;
    tanh(): Decimal;
    asinh(): number;
    acosh(): number;
    atanh(): number;
    ascensionPenalty(ascensions: number): Decimal;
    egg(): Decimal;
    lessThanOrEqualTo(other: DecimalSource): boolean;
    lessThan(other: DecimalSource): boolean;
    greaterThanOrEqualTo(other: DecimalSource): boolean;
    greaterThan(other: DecimalSource): boolean;
    decimalPlaces(): number;
    dp(): number;
    static get MAX_VALUE(): Decimal;
    static get MIN_VALUE(): Decimal;
    static get NUMBER_MAX_VALUE(): Decimal;
    static get NUMBER_MIN_VALUE(): Decimal;
}
