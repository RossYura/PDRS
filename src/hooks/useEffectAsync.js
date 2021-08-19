import { useEffect } from 'react';

const useEffectAsync = (asyncEffect, deps) => {
  useEffect(() => {
    asyncEffect();
  }, deps);
};

export default useEffectAsync;