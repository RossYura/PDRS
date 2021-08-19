export const isInvestmentCompanyCompleted = company => company &&
  company.investmentStatus === 'complete_successful';

export const isPaymentWaitingForConfirmation = company => company && company.userInvestments[0] && company.userInvestments[0].status === 'payment_sent';

export const isPaymentCompleted = company => company && company.userInvestments[0] && company.userInvestments[0].status === 'payment_complete';