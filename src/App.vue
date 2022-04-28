<script setup lang="ts">
import MathButton from './components/MathButton.vue';
import WinOverlay from './components/winOverlay.vue';
import { mathSymbols } from './store/equation/actions';
import { deleteEquation, n, onNumberClick, onSymbolClick, submitResult } from './store/game/actions';
import { calculteds, getEquations, hasWin, numbers, resultToFind, showSolution, sortedCalculteds, sortedNumbers, solution } from './store/game/state';
import logoUrl from "./assets/logo.svg";
</script>
<template>
  <main>
    <div class="head">
      <img :src="logoUrl" role="heading" aria-level="1" title="frechi" />
      <p v-if="showSolution">{{ solution }} =   </p>
      <h2>{{ resultToFind }}</h2>
      <button @click="showSolution=true">Afficher la solution</button>
    </div>
    <div class="result">
      <output v-for="equation, i in getEquations">
        <p>{{ n(equation.entry1) }}</p>
        {{ n(equation.symbol) }}
        <p>{{ n(equation.entry2) }}</p>
        {{ equation.result != null ? "= " + equation.result : "" }}
        <button class="accept" v-if="i == 0 && equation.result != null" @click="submitResult()">✔</button>
        <button class="delete" v-if="i == 0 && ( getEquations.length > 1 || Object.keys(equation).length != 0)" @click="deleteEquation()">X</button>
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
  background: repeat-y url('/japanBackground.png');
  background-attachment: fixed;
  background-size: 100% auto;
  background-position: center;
}
.head {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 15px 0;
  gap: 15px;
  align-items: center;
  color: #000;
  font-weight: bolder;
  img {
    filter: drop-shadow(0 0 5px #000);
  }
  button {
    border: none;
    border-radius: 15px;
    padding: 15px;
    color: #000;
    font-weight: bold;
    &:hover {
      transform: scale(1.025);
    } 
    &:active {
        transform: scale(.975);
    }
  }
}
.result {
  font-size: 1rem;
  height: calc(100vh - 36ch);
  min-height: 34ch;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
  padding: 1ch 0;
  gap: 1ch;
  
  
}
output {
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding:  1ch;
  gap: 1ch;
  border-radius: 5px;
  background: #222;
  min-height: 10ch;
  min-width: 35ch;
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
  button {
    font-size: 2rem;
    border: none;
    border-radius: 15px;
    display: grid;
    justify-self: flex-end;
    place-items: center;
    background: none;
    &.accept {
      color: #0c0;
      margin-left: auto;
      ~ .delete {
        margin-left: unset;
      }
    }
    &:hover {
      cursor: pointer;
    }
    &.delete {
      color: #c00;
      margin-left: auto;
    }
    
  }
}
main {
  background: url('/naruto.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  color: #ccc;
  position: absolute;
  inset: 0;
  overflow: auto;
  display: flex;
  min-height: 100%;
  padding: 5px;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  > section {
    > div {
      font-size: 1rem;
      display: flex;
      max-width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      min-height: 10ch;
      padding: 1ch;
      gap: 15px;
    }
  }


}
</style>
