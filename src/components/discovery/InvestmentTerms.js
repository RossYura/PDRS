import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from 'styles';

export default class InvestmentTerms extends React.Component {
  render() {
    let company = this.props.navigation.getParam('company', {});

    return( 
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 8 }} />
          <Text style={styles.headerText}>
             Investment Terms for {company.name}
          </Text>
          <View style={{ height: 16 }} />
          <Text style={styles.bodyText}>   
            TODO 
            Many early-stage businesses fail, and if you invest in a business 
            displayed on the platform, it is more likely that 
            you will lose all of your invested capital than you will see any 
            return of capital or a profit. You should not invest more money 
            in the types of businesses displayed on the platform than you 
            can afford to lose without altering your standard of living.
          </Text>
          <View style={{ height: 24 }} />

          <Text style={styles.subHeaderText}>     
            2. Illiquidity
          </Text>
          <View style={{ height: 16 }} />
          <Text style={styles.bodyText}>   
            Almost all investments you make in businesses displayed on the 
            platform will be highly illiquid. It is very unlikely that there 
            will be a liquid secondary market for the shares of the business. 
            This means you should assume that you will be unlikely to be able 
            to sell your shares until and unless the business floats on a 
            stock exchange or is bought by another company. If this 
            occurs your investment may continue to be illiquid. Even for a 
            successful business, a flotation or purchase is unlikely to occur 
            for a number of years from the time you make your investment.
          </Text>
          <View style={{ height: 24 }} />

          <Text style={styles.subHeaderText}>     
            3. Rarity of Dividends
          </Text>
          <View style={{ height: 16 }} />
          <Text style={styles.bodyText}>   
            Businesses of the type displayed on the platform rarely pay 
            dividends. This means that if you invest in a business through 
            the platform, even if it is successful you are unlikely to see 
            any return of capital or profit until you are able to sell your 
            shares. Even for a successful business, this is unlikely to 
            occur for a number of years from the time you make your investment.
          </Text>
          <View style={{ height: 24 }} />

          <Text style={styles.subHeaderText}>     
            4. Dilution
          </Text>
          <View style={{ height: 16 }} />
          <Text style={styles.bodyText}>   
            Any investment you make in a business displayed on the platform is 
            likely to be subject to dilution. This means that if the business 
            raises additional capital at a later date, it will issue new shares 
            to the new investors, and the percentage of the business that you 
            own will decline. These new shares may also have certain preferential 
            rights to dividends, sale proceeds and other matters, and the 
            exercise of these rights may work to your disadvantage. Your investment 
            may also be subject to dilution as a result of the grant of options 
            (or similar rights to acquire shares) to employees or certain other 
            contacts of the business.
          </Text>
          <View style={{ height: 24 }} />

          <Text style={styles.subHeaderText}>
            5. Diversification
          </Text>
          <View style={{ height: 16 }} />
          <Text style={styles.bodyText}>
            If you choose to invest in businesses of the type displayed on the 
            platform, such investments should only be made as part of a 
            diversified portfolio. This means that you should invest only 
            a portion of your investable capital in such businesses, and the 
            majority of your investable capital should be invested in more liquid 
            assets. It also means that you should spread your investment between 
            multiple businesses rather than investing a larger amount in just a few.
          </Text>
          <View style={{ height: 36 }} />
        </ScrollView>
      </View>
    );
  }
}
