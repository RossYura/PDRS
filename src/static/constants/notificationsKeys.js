export const NEW_MATCH = 'new_match';
export const USER_APPROVED = 'user_approved';
export const NEW_INVESTOR_UPDATE_extractor = (companyId) => `investor_update_company_${companyId}`;
export const ROUND_COMPLETED = /^round_complete_company_\d+$/g;
export const PAYMENT_COMPLETED = 'investment_payment_complete';
