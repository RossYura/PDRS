import ScreenContainer from '../index';
import withTheme from 'HOCs/withTheme';

export default withTheme.inject(ScreenContainer.themes.dark)(ScreenContainer);