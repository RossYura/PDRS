import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import Avatar from 'components/common/Avatar';

class FounderQAContainer extends React.Component {
  constructor(props) {
    super(props);

    let { company } = this.props;
    let sections = [
      {
        title: 'What is your company going to make?',
        content: company.ideaDefineProblem,
      },
      {
        title: 'Why did you pick this idea to work on?',
        content: company.ideaWhyChooseThis,
      },
      {
        title: 'How will you make money?',
        content: company.ideaHowMakeMoney,
      },
      {
        title: 'What is your beachhead market and how big is it?',
        content: `Size: €${company.ideaSizeBeachheadMarketMillions}m - ${company.ideaWhatBeachheadMarket}`,
      },
      {
        title: 'Who are your competitors?',
        content: company.ideaCompetitors,
      },
      {
        title: 'How will you get users?',
        content: company.ideaHowAcquireUsers,
      },
      {
        title: 'What do you understand about your industry that other companies just don\'t get?',
        content: company.ideaUniqueInsight,
      },
    ];

    this.state = {
      activeSections: [],
      sections,
    };
  }

  render() {
    const { showModal, teamMembers } = this.props;
    const { sections, activeSections } = this.state;

    return (
      <View>
        {
          sections.map(({ title, content }) => (
            <View key={title}>
              <Text style={styles.headerText}>
                {title}
              </Text>
              <Space size={12}/>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {
                  teamMembers && (
                    <Avatar
                      firstName={teamMembers[0].firstName}
                      lastName={teamMembers[0].lastName}
                      avatarUri={teamMembers[0].profilePicture}
                    />
                  )
                }
                <Space horizontal size={20}/>
                <Text
                  fontSize={15}
                  style={{
                    flex: 1
                  }}
                >
                  {content}
                </Text>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
  },
  headerText: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 15,
    color: colors._darkblue,
  },
  content: {
    paddingLeft: 30,
    paddingTop: 15,
    flex: 1,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 20,
  },
});

FounderQAContainer.propTypes = {
  company: PropTypes.object,
  investorQuestions: PropTypes.array,
  showModal: PropTypes.func,
};

export default FounderQAContainer;