import Carousel from '../index';
import withTheme from 'HOCs/withTheme';

export default withTheme.inject(Carousel.themes.grey)(Carousel);