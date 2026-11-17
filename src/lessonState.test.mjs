import assert from 'node:assert/strict'
import test from 'node:test'
import {
  advanceLessonState,
  applyCorrectRepairState,
  changeChoiceState,
  initialLessonState,
} from './lessonState.ts'

test('missing prediction records an attempted advance without moving', () => {
  const next = advanceLessonState({ ...initialLessonState })
  assert.equal(next.phase, 'predict')
  assert.equal(next.advanceAttempted, true)
})

test('blank or whitespace reflection cannot advance', () => {
  const next = advanceLessonState({ ...initialLessonState, phase: 'explain', reflection: '   ' })
  assert.equal(next.phase, 'explain')
  assert.equal(next.advanceAttempted, true)
})

test('explicit apply preserves a Repair B choice and applies Repair A', () => {
  const feedback = { ...initialLessonState, phase: 'feedback', chosenRepair: 'repairB' }
  const applied = applyCorrectRepairState(feedback)
  assert.equal(applied.phase, 'try')
  assert.equal(applied.chosenRepair, 'repairB')
  assert.equal(applied.appliedRepair, 'repairA')
})

test('change choice returns to Choose without applying a repair', () => {
  const feedback = { ...initialLessonState, phase: 'feedback', chosenRepair: 'repairB' }
  const changed = changeChoiceState(feedback)
  assert.equal(changed.phase, 'choose')
  assert.equal(changed.chosenRepair, 'repairB')
  assert.equal(changed.appliedRepair, null)
})
