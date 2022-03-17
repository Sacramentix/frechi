import { MathSymbol } from "../equation/actions"

export type Complete<T> = {
    [K in keyof T]-?: T[K];
}

export type Equation = {
    entry1?: number,
    symbol?: MathSymbol,
    entry2?: number,
    result?: number
}