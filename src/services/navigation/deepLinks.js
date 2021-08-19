import { getStateFromPath } from '@react-navigation/core';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';

import NavigationService from 'services/navigation';
import store from 'redux/store';
import { pipe } from 'utils/fp';
import { arraySum } from 'utils/number';
import { showModal } from 'redux/common/actions';
import NetworkService from 'services/network';
import StorageService from 'services/storage';
import { cardsMap } from 'components/newsfeed/NewsfeedIndex';

export const getDeepLinkWithoutPrefix = deepLinkUrl => deepLinkUrl.match(/(^.+)((?:(?:app)|(?:modals)).+$)/g) &&
  deepLinkUrl.replace(/(^.+)((?:(?:app)|(?:modals)).+$)/g, '$2');

const deepLinksMap = [
  {
    url: 'startup_index',
    handler: () => {
      NavigationService.navigator.reset({
        index: 0,
        ...getStateFromPath('App/Main/StartupIndex'),
      });
    },
  },
  {
    url: 'update',
    handler: () => {
      Updates.reload();
    },
  },
  {
    url: 'update_store',
    handler: () => {
      Linking.openURL('https://apps.apple.com/us/app/pitchdrive/id1448265694?ls=1');
    },
  },
  {
    url: 'newsfeed_item',
    handler: (url, { id }) => {
      NetworkService.Newsfeed()
        .code200(async ({ data: feedItem }) => {

          NavigationService.navigator.reset({
            routes: [
              {
                name: 'App',
                state: {
                  routes: [
                    {
                      name: 'Main',
                      state: {
                        routes: [
                          {
                            name: 'Newsfeed',
                            state: {
                              index: 1,
                              routes: [
                                {
                                  name: 'NewsfeedIndex',
                                  params: { updateEvent: feedItem },
                                },
                                {
                                  name: cardsMap[feedItem.category].detailsRoute,
                                  params: { updateEvent: feedItem },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          });
        })
        .getById(id);
    },
  },
  {
    url: 'payment_info',
    handler: (url, { company_id, ref_code }) => {
      NetworkService.companies()
        .code200(async ({ data: { company } }) => {
          const user = await StorageService.User.get();
          NavigationService.navigate('Startups');
          store.dispatch(
            showModal('payment', {
              company,
              amount: arraySum(company.userInvestments.map(({ amount }) => amount)),
              investingAs: user.investmentEntities
                .find(({ id }) => company.userInvestments[0].investmentEntityId === id).name,
              refCode: ref_code,
            }),
          );
        })
        .getCompanyById(company_id);
    },
  },
];

let deepLinksLocked = false;

export const handle = fullUrl => {
  const { path, queryParams } = Linking.parse(fullUrl);

  if (path) {
    const url = __DEV__ ? getDeepLinkWithoutPrefix(path) : path;
    if (!deepLinksLocked) {
      deepLinksLocked = true;
      setTimeout(() => {
        deepLinksLocked = false;
      }, 1000);
      pipe(
        deepLinksMap.find(({ url: _url }) => url === _url),
        match => match?.handler(url, queryParams),
      );
    }
  }
};