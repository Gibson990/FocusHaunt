import assert from 'node:assert/strict'
import test from 'node:test'
import {
  advanceLessonState,
  applyCorrectRepairState,
  backLessonState,
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

test('Back from open Observe closes the fixture and requests Predict focus', () => {
  const observe = { ...initialLessonState, phase: 'observe', fixtureOpen: true }
  const backed = backLessonState(observe)
  assert.equal(backed.phase, 'predict')
  assert.equal(backed.fixtureOpen, false)
  assert.equal(backed.focusDestination, 'prediction')
})

test('Back from open Try closes the fixture and requests Feedback focus', () => {
  const trying = { ...initialLessonState, phase: 'try', fixtureOpen: true, appliedRepair: 'repairA' }
  const backed = backLessonState(trying)
  assert.equal(backed.phase, 'feedback')
  assert.equal(backed.fixtureOpen, false)
  assert.equal(backed.focusDestination, 'feedbackAction')
})

test('advancing from open Observe closes the fixture and requests Choose focus', () => {
  const observe = { ...initialLessonState, phase: 'observe', fixtureOpen: true, observedOnce: true }
  const advanced = advanceLessonState(observe)
  assert.equal(advanced.phase, 'choose')
  assert.equal(advanced.fixtureOpen, false)
  assert.equal(advanced.focusDestination, 'repairChoice')
})

test('Explain Continue to Feedback requests the Feedback heading, not an action', () => {
  const explain = { ...initialLessonState, phase: 'explain', reflection: 'because' }
  const advanced = advanceLessonState(explain)
  assert.equal(advanced.phase, 'feedback')
  assert.equal(advanced.focusDestination, 'phaseHeading')
})

test('Apply the correct repair requests the Try heading', () => {
  const applied = applyCorrectRepairState({ ...initialLessonState, phase: 'feedback', chosenRepair: 'repairB' })
  assert.equal(applied.phase, 'try')
  assert.equal(applied.focusDestination, 'phaseHeading')
})

test('Change my choice requests the first repair choice', () => {
  const changed = changeChoiceState({ ...initialLessonState, phase: 'feedback', chosenRepair: 'repairB' })
  assert.equal(changed.phase, 'choose')
  assert.equal(changed.focusDestination, 'repairChoice')
})

test('Back into Predict (Back becomes disabled) requests Predict focus; other closed Back/Continue request none', () => {
  assert.equal(backLessonState({ ...initialLessonState, phase: 'observe' }).focusDestination, 'prediction')
  assert.equal(backLessonState({ ...initialLessonState, phase: 'choose' }).focusDestination, null)
  assert.equal(advanceLessonState({ ...initialLessonState, phase: 'predict', predicted: 'x' }).focusDestination, null)
  assert.equal(advanceLessonState({ ...initialLessonState, phase: 'choose', chosenRepair: 'repairA' }).focusDestination, null)
})
