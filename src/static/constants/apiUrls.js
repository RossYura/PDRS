export const loginUserUrl = '/api/v1/sessions';
export const signupUserUrl = () => '/api/v1/registrations';
export const forgotPasswordUrl = () => '/api/v1/forgot_passwords/update';
export const logoutUserUrl = () => '/api/v1/mobile_sessions/destroy';
export const resetPasswordUrl = '/api/v1/passwords/update';
export const sendContractsUrl = '/api/v1/help_centre/mail_unsigned_investment_contracts';
export const getUserUrl = userId => `/api/v1/users/${userId}`;
export const profileDetailsProtectedUpdateUrl = userId => `/api/v1/users/${userId}/protected_update`;
export const reactivateUserUrl = userId => `/api/v1/users/${userId}/reactivate_investor`;
export const investmentContractsUrl =
  userId => `/api/v1/users/${userId}/investment_contracts`;
export const profilePictureUrl = userId => `/api/v1/users/${userId}/profile_picture`;
export const helpRequestUrl = userId => `/api/v1/users/${userId}/help_request`;

export const signDocumentsUrl =
  userId => `/api/v1/users/${userId}/mark_investor_live`;
export const submitGeneralProfileUrl = '/api/v1/profile/general';
export const submitQuizUrl = '/api/v1/profile/investor_quiz';
export const getKeywordsUrl = '/api/v1/keywords';
export const submitExpertiseProfileUrl = '/api/v1/profile/expertise';
export const submitInvestorStatementProfileUrl = '/api/v1/profile/investor_statement';

export const investStartupUrl = (matchId) => `/api/v1/matches/${matchId}/investments`;
export const getCompanyByIdUrl =
  companyId => `/api/v1/companies/${companyId}`;
export const getStartupsUrl = () => '/api/v1/matches';
export const getProspectMatchesUrl = 'api/v1/prospect_matches';
export const setProspectMatchUrl = pmatchId => `/api/v1/prospect_matches/${pmatchId}`;
export const getStartupByIdUrl = (matchId) => `/api/v1/matches/${matchId}`;
export const matchDisableUrl = (matchId) => `/api/v1/matches/${matchId}/mark_declined`;

export const submitStartupQuestionUrl = (companyId) => `/api/v1/companies/${companyId}/investor_questions`;

export const getCompaniesUrl = () => '/api/v1/companies';
export const getCompaniesWithPendingInvestmentsUrl = '/api/v1/companies/with_pending_investments';

export const getNewsfeedUrl = (page = 1) => `/api/v1/newsfeed_items?page=${page}`;
export const getNewssfeedByIdUrl = (id) => `/api/v1/newsfeed_items/${id}`;
export const getCompanyNewsfeedUrl = (companyId, page = 1) => `/api/v1/companies/${companyId}/newsfeed_items?page=${page}`;

export const getMarkPaymentSendUrl = (
  matchId,
) => `/api/v1/matches/${matchId}/mark_payment_sent`;