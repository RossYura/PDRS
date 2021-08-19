import React, { useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import ProblemIcon from 'assets/images/icon_problem.png';
import SolutionIcon from 'assets/images/icon_solution.png';
import HowdoesitworkIcon from 'assets/images/icon_howtowork.png';
import BusinessmodelIcon from 'assets/images/icon_businessmodel.png';
import MarketIcon from 'assets/images/icon_market.png';
import CompetitionIcon from 'assets/images/icon_competition.png';
import InfoIcon from 'assets/images/icon_info.png';
import colors from 'styles/colors';

const getNormalizedCompanyInfo = company => {
  const additionalInfo =
    `Registered Number: ${company.legalNumber}\n\n` +
    `Address: ${company.addressStreetAddress}, ${company.addressCity}, ${company.addressCountry}\n\n` +
    `Official Company Name: ${company.legalName}`;

  return [
    {
      title: 'The Problem',
      icon: ProblemIcon,
      details: company['ideaDefineProblem'],
    },
    {
      title: 'The Solution',
      icon: SolutionIcon,
      details: company['description'],
    },
    {
      title: 'The \'How Does it Work\'',
      icon: HowdoesitworkIcon,
      details: company['ideaHowDoesItWork'],
    },
    {
      title: 'The Business Model',
      icon: BusinessmodelIcon,
      details: company['ideaBusinessModel'],
    },
    {
      title: 'The Market',
      icon: MarketIcon,
      details: company['ideaWhatBeachheadMarket'],
    },
    {
      title: 'The Competition',
      icon: CompetitionIcon,
      details: company['ideaCompetitors'],
    },
    {
      title: 'Additional Info',
      icon: InfoIcon,
      details: additionalInfo,
    },
  ];
};

const AboutContainer = ({ company }) => {
  const info = useMemo(() => getNormalizedCompanyInfo(company), [company]);
  const [openedCellIndex, changeOpenedCellIndex] = useState(0);

  return (
    <View style={styles.container}>
      {info.map((item, index) =>
        openedCellIndex === index ? (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemOpen,
              styles.borderedContainer,
            ]}
            onPress={() => changeOpenedCellIndex(index)}
          >
            <View style={styles.itemCollapsed}>
              <Text style={styles.title}>{item.title}</Text>
              <Image
                source={item.icon}
                style={styles.iconOpen}
                resizeMode='contain'
              />
            </View>
            <Text style={styles.details}>
              {item.details}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemCollapsed,
              styles.borderedContainer,
            ]}
            onPress={() => changeOpenedCellIndex(index)}
          >
            <Text
              style={styles.title}
            >
              {item.title}
            </Text>
            <Image
              source={item.icon}
              style={styles.iconCollapsed}
              resizeMode='contain'
            />
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 40,
  },
  itemOpen: {
    alignSelf: 'stretch',
  },
  itemCollapsed: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'ProximaNova_Regular',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(57, 60, 63, 0.9)',
  },
  iconOpen: {
    width: 15,
    height: 15,
    tintColor: colors._deepblue,
  },
  iconCollapsed: {
    width: 15,
    height: 15,
    tintColor: 'rgba(59, 61, 70, 0.6)',
  },
  details: {
    fontSize: 14,
    lineHeight: 22,
    color: colors._gray,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  borderedContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors._blue,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: colors._blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AboutContainer;