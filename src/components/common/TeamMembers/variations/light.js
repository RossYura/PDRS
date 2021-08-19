import TeamMembers from '../index';
import withTheme from 'HOCs/withTheme';

export default withTheme.inject(TeamMembers.themes.light)(TeamMembers);