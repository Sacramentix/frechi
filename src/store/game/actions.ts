import { getSeriesAndResult, solve } from "../equation/actions";
import { resultToFind, hasWin, equations, calculteds, numbers, showSolution, solution } from "./state";
import type { Complete, Equation, MathSymbol } from "./type";

export function reset() {
    const { series, result, equation } = getSeriesAndResult(5);
    resultToFind.value = result;
    solution.value = equation;
    hasWin.value = false;
    equations.value = [{}];
    calculteds.value = [];
    numbers.value = series;
    showSolution.value = false;
}

export function onNumberClick(n:number, a:number[]) {
    const [e] = equations.value.slice(-1);
    if (e.symbol != null) {
        if (e.entry2 != null) a.push(e.entry2);
        e.entry2 = removeFrom(a, n);
        e.result = solveEquation(e as Complete<Equation>);
    } else {
        if (e.entry1 != null) a.push(e.entry1);
        e.entry1 = removeFrom(a, n);
    }
}

export function onSymbolClick(s:MathSymbol) {
    const [e] = equations.value.slice(-1);
    if (e.entry1 != null) {
        e.symbol = s;
        if (e.entry2 != null) {
            e.result = solveEquation(e as Complete<Equation>);
        }
    }
}

export function submitResult() {
    const [e] = equations.value.slice(-1);
    if (e.result != null) {
        calculteds.value.push(e.result);
        equations.value.push({});
    }
}

export function deleteEquation() {
    const e = equations.value.pop();
    const copy = equations.value.slice();
    [e?.entry1, e?.entry2].forEach(i=>{
        if(i!=null) {
        const j = copy.findIndex(v=>v.result==i);
        if (j!=-1) {
            equations.value.splice(i,1);
            copy.splice(i,1);
            calculteds.value.push(i);
        } else {
            numbers.value.push(i);
        }
        }
    });
    const [l] = equations.value.slice(-1);
    if (l?.result != null) removeFrom(calculteds.value, l.result);
    if (equations.value.length == 0) equations.value.push({});
}

export function removeFrom(a:number[], n:number):number {
    const index = a.indexOf(n);
    if (index > -1) return a.splice(index, 1)[0];
    return -1;
}

export function n(n?:number | string) {
    return n != null ? n : ""
}

export function solveEquation(e:Complete<Equation>) {
    const v = solve(e.entry1, e.symbol, e.entry2);
    hasWin.value = v==resultToFind.value;
    return v;
}