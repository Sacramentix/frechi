<template>
    <button  class="math-button" :disabled="disabled">
        {{ value }}
    </button>
</template>
<style lang="scss">
.math-button {
    font-size: 1rem;
    border: none;
    height: 8ch;
    width: 8ch;
    display: grid;
    place-items: center;
    border-radius: 15px;
    &:hover {
        transform: scale(1.025);
    }
    &:active {
        transform: scale(.975);
    }
    &:disabled {
        filter: brightness(.8);
    }
}
</style>
<script lang="ts" setup>
defineProps({
    value: String,
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>