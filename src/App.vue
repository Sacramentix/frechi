<script setup lang="ts">
import MathButton from './components/MathButton.vue';
import WinOverlay from './components/winOverlay.vue';
import { mathSymbols } from './store/equation/actions';
import { deleteEquation, n, onNumberClick, onSymbolClick, submitResult } from './store/game/actions';
import { calculteds, equations, hasWin, numbers, resultToFind, sortedCalculteds, sortedNumbers } from './store/game/state';
</script>
<template>
  <main>
    <h1>Frechi</h1>
    <h2>{{ resultToFind }}</h2>
    <div class="result">
      <output v-for="equation, i in equations">
        <p>{{ n(equation.entry1) }}</p>
        {{ n(equation.symbol) }}
        <p>{{ n(equation.entry2) }}</p>
        {{ equation.result != null ? "= " + equation.result : "" }}
        <button v-if="i == equations.length -1 && equation.result != null" @click="submitResult()">✔</button>
        <button class="delete" v-if="i == equations.length -1 && ( equations.length > 1 || Object.keys(equation).length != 0)" @click="deleteEquation()">X</button>
      </output>
    </div>
    <section>
      <div>
        <MathButton v-for="c in sortedCalculteds" :value="c+''" @click="onNumberClick(c, calculteds)" />
      </div>
      <div>
        <MathButton v-for="n in sortedNumbers" :value="n+''" @click="onNumberClick(n, numbers)" />
      </div>
      <div>
        <MathButton v-for="m in mathSymbols" :value="m" @click="onSymbolClick(m)" />
      </div>
    </section>
  </main>
  <WinOverlay v-if="hasWin"/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Mochiy Pop One", sans-serif;
  font-size: 25px;
}
.result {
  font-size: 1rem;
  min-height: 50ch;//8*5+7
  
}
output {
  font-size: 1rem;
  border: 0.2px solid red;
  display: flex;
  align-items: center;
  min-height: 10ch;
  padding: 1ch;
  gap: 1ch;
  >p {
    font-size: 1rem;
    padding: 0;
    background: #ccc;
    color: #000;
    height: 8ch;
    width: 8ch;
    display: inline-grid;
    place-items: center;
    border-radius: 15px;
    &:empty {
      display: none;
    }
  }
  div {
    display: flex;
    gap: 5px;
  }
  button {
    font-size: 2rem;
    border: none;
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: none;
    color: #0c0;
    &:hover {
      cursor: pointer;
    }
    &.delete {
      color: #c00;
    }
  }
}
main {
  background: #000;
  color: #ccc;
  position: absolute;
  inset: 0;
  overflow: auto;
  display: flex;
  min-height: 100%;
  padding: 15px;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  > section {
    > div {
      display: flex;
      justify-content: center;
      padding: 15px;
      gap: 15px;
    }
  }


}
</style>
