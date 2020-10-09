// tslint:disable:no-expression-statement
import { useEffect } from 'react'
import { letsReportStep, letsWriteIssueTitleStep, letsAmendIssueTitleStep, postAsNewIssueStep } from '../tour'

export function handleTour(tour: any, state: DemoState): void {
  useEffect(() => {
    if (state.open && tour && tour.currentStep.id === letsReportStep.id) {
      tour.next()
    }
  }, [state.open])

  useEffect(() => {
    if (state.editingIssue.title.trim().toLowerCase() === 'checkout' && tour && tour.currentStep.id === letsWriteIssueTitleStep.id) {
      tour.next()
    }
  }, [state.editingIssue.title])

  useEffect(() => {
    if (state.editingIssue.title.toLowerCase().includes('supersuit') && tour && tour.currentStep.id === letsAmendIssueTitleStep.id) {
      tour.next()
    }
  }, [state.editingIssue.title])

  useEffect(() => {
    if (state.isNewIssue && tour && tour.currentStep.id === postAsNewIssueStep.id) {
      tour.next()
    }
  }, [state.isNewIssue])
}
