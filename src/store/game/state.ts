import { ref, computed } from "vue";
import { getSeriesAndResult } from "../equation/actions";
import type { Equation } from "./type";


export const { series, result, equation } = getSeriesAndResult(5);

export const resultToFind = ref(result);

export const hasWin = ref(false)

export const equations = ref<Equation[]>([{}]);

export const calculteds = ref<number[]>([]);

export const numbers = ref(series);

export const solution = ref(equation);

export const showSolution = ref(false);

export const sortedNumbers = computed(()=>numbers.value.sort((a,b)=>a-b));
export const sortedCalculteds = computed(()=>calculteds.value.sort((a,b)=>a-b));
export const getEquations = computed(()=>equations.value.slice().reverse());
