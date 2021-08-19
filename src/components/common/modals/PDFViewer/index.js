import React from 'react';
import { connect } from 'react-redux';
import {
  Share,
  Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

import { showModal, hideModal } from 'redux/common/actions';
import styles from './styles';
import InteractiveInterface, {
  INTERFACE_TYPE as INTERACTIVE_INTERFACE_TYPE,
} from './containers/InteractiveInterface';
import OverviewInterface from './containers/OverviewInterface';
import {
  getModalParamsByName,
} from 'redux/common/selectors';

class PDFViewer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      htmlTemplate: null,
    };
  }

  async componentWillReceiveProps (nextProps) {
    const { modalParams: { html } } = this.props;
    const { modalParams: { html: nextHtml, pdf, local } } = nextProps;

    if (nextHtml && html !== nextHtml) {
      let asset;
      if (local) {
        // this.getHtmlTemplate(nextHtml);

        asset = Asset.fromModule(pdf);
        const { uri: uriLocal } = await FileSystem.downloadAsync(
          asset.uri,
          FileSystem.documentDirectory +
          `${asset ? asset.name : 'contract'}.pdf`,
        );
        this.uriLocal = uriLocal;
      } else {
        this.uriLocal = pdf;
      }
    }
  }

  onHide = () => {
    const { modalParams: { onHideModal }, hideModal } = this.props;

    hideModal('pdfViewer');
    onHideModal && onHideModal();
  };

  onShare = async () => {
    await Share.share({
      message: 'Document',
      url: this.uriLocal || this.props.modalParams.pdf,
    });
  };

  getContainerInterface = () => {
    const { modalParams: { containerInterface, visible, onConfirm, onReject } } = this.props;

    switch (containerInterface) {
    case INTERACTIVE_INTERFACE_TYPE:
      return ({ children }) => (
        <InteractiveInterface
          visible={visible}
          onConfirm={onConfirm}
          onReject={onReject}
          onHide={this.onHide}
          onShare={this.onShare}
          children={children}
        />
      );
    default:
      return ({ children }) => (
        <OverviewInterface
          visible={visible}
          onShare={this.onShare}
          onHide={this.onHide}
          children={children}
        />
      );
    }
  };

  getHtmlTemplate = async (html) => {
    const { uri } = Asset.fromModule(html);
    const res = await fetch(uri);
    const htmlTemplate = await res.text();
    this.setState({ htmlTemplate });
  };

  render () {
    const { modalParams: { html, pdf, local } } = this.props;
    const { htmlTemplate } = this.state;
    const ContainerInterface = this.getContainerInterface();

    return (
      <ContainerInterface>
        {
          !html && pdf ? (
            <WebView
              source={{ uri: pdf }}
              style={styles.reader}
              javaScriptEnabled
              originWhitelist={['*']}
              allowFileAccess
            />
          ) : (
            <WebView
              source={
                local
                  ? Platform.OS === 'ios'
                    ? html
                    : { html: htmlTemplate }
                  : { uri: html }
              }
              style={styles.reader}
              javaScriptEnabled={true}
              originWhitelist={['*']}
              allowFileAccess={true}
            />
          )
        }
      </ContainerInterface>
    );
  }
}

const mapStateToProps = state => ({
  modalParams: getModalParamsByName(state)('pdfViewer'),
});

const mapDispatchToProps = {
  hideModal,
  showModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PDFViewer);