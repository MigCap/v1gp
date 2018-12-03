import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import anime from 'animejs';

import styled from 'styled-components';
import { theme, mixins } from '../styles';

const LoaderContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${theme.colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const LogoWrapper = styled.div`
  width: max-content;
  max-width: 100px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #B {
      opacity: 0;
    }
  }
`;

class Loader extends Component {
  static propTypes = {
    finishLoading: PropTypes.func.isRequired,
  };

  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true }, () => this.animate());
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  animate() {
    const loader = anime.timeline({
      complete: () => this.props.finishLoading(),
    });

    loader
      .add({
        targets: '#logo path',
        delay: 500,
        duration: 2000,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #B',
        duration: 800,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 700,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  }

  render() {
    const { isMounted } = this.state;

    return (
      <LoaderContainer className="loader">
        <Helmet>
          <body className={isMounted ? 'hidden' : ''} />
        </Helmet>
        <LogoWrapper isMounted={isMounted}>
          <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <title>Loader Logo</title>
            <g>
              <g id="B" transform="translate(0 0)">
                <path
                  d="M35.05,66V35.4h8.66l4.61,12.53c.28.84.55,1.72.8,2.63s.52,1.82.8,2.73h.19c.28-.91.55-1.82.8-2.73s.52-1.79.8-2.63L56.13,35.4h8.66V66H57.45V57c0-.78,0-1.64.12-2.59s.16-1.9.26-2.89.2-1.95.33-2.9.23-1.78.33-2.54H58.3l-2.54,7.35L52,63.51H47.66L43.9,53.39,41.45,46h-.19c.09.76.2,1.6.33,2.54s.23,1.91.33,2.9.18,2,.26,2.89.11,1.81.11,2.59v9Z"
                  fill="#64FFDA"
                />
              </g>
              <path
                stroke="#64FFDA"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
              />
            </g>
          </svg>
        </LogoWrapper>
      </LoaderContainer>
    );
  }
}

export default Loader;
