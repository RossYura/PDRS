import withProps from 'recompose/withProps';
import setStatic from 'recompose/setStatic';

export default {
  describe: themeDescriptors => Component => {
    if (!Component.themes) {
      return setStatic('themes', themeDescriptors)(Component);
    }
    return Component;
  },

  inject: theme => Component => withProps(theme)(Component),
};