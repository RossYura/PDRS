import React from 'react';
import { useDispatch } from 'react-redux';

import { arraySum } from 'utils/number';
import Button from 'components/common/Button';
import { showModal } from 'redux/common/actions';
import useUser from 'hooks/useUser';

const PaymentButton = ({
  company,
  refCode,
  reloadHandler
}) => {
  const dispatch = useDispatch();
  const showModalDispatch = (...args) => dispatch(showModal(...args));
  const user = useUser();
  const { userId, investmentEntities } = user;

  const userRelatedInvestments = company.userInvestments
    .filter((investment) => investment.userId === +userId);

  return (
    <Button
      width={162}
      height={47}
      onPress={() => showModalDispatch('payment', {
        company,
        amount: arraySum(userRelatedInvestments.map(({ amount }) => amount)),
        investingAs: investmentEntities
          .find(({ id }) => userRelatedInvestments[0].investmentEntityId === id).name,
        refCode,
        reloadHandler,
      })}
      text="Go to payment"
      customTextStyles={{
        fontSize: 15,
      }}
      style={{
        alignSelf: 'center',
        marginBottom: 15,
      }}
    />
  );
};

export default PaymentButton;