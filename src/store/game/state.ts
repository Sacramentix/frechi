import { ref, computed } from "vue";
import { getSeriesAndResult, MathSymbol, solve } from "../equation/actions";
import { Equation, Complete } from "./type";


export const { series, result } = getSeriesAndResult(5);

export const resultToFind = ref(result);

export const hasWin = ref(false)

export const equations = ref<Equation[]>([{}]);

export const calculteds = ref<number[]>([])
export const numbers = ref(series);

export const sortedNumbers = computed(()=>numbers.value.sort((a,b)=>a-b));
export const sortedCalculteds = computed(()=>calculteds.value.sort((a,b)=>a-b));
