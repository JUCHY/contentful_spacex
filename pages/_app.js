import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'video-react/dist/video-react.css'; // import css
import '../styles/globals.css';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object])).isRequired,
};
