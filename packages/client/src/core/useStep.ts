import { ref } from '@vue/composition-api'

export const useStep = (init: number = 0, step: number = 1) => {
  const stepRef = ref(init)

  const next = (increment?: number): void => {
    stepRef.value += increment || step
  }

  const prev = (decrement?: number): void => {
    stepRef.value -= decrement || step
  }

  const isEqual = (num: number): boolean => {
    return stepRef.value === num
  }

  const reset = (): void => {
    stepRef.value = init
  }

  return { stepRef, next, prev, isEqual, reset }
}
