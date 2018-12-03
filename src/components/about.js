import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { srConfig } from '../config';

import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '../styles';

import ScrollReveal from 'scrollreveal';

const AboutContainer = styled(Section)`
  position: relative;
  max-width: 700px;
`;
const FlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const ContentContainer = styled.div`
  width: 100%;
  max-width: 750px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 250px));
  ${media.phone`grid-template-columns: repeat(2, minmax(160px, 250px));`};
  overflow: hidden;
  margin-top: 20px;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smallish};
  color: ${theme.colors.slate};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${theme.colors.green};
    font-size: ${theme.fontSizes.small};
    line-height: 12px;
  }
`;

class About extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  componentDidMount() {
    ScrollReveal().reveal(this.about, srConfig());
  }

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data[0].node;
    const { title, skills } = frontmatter;

    return (
      <AboutContainer id="about" ref={el => (this.about = el)}>
        <Heading>{title}</Heading>
        <FlexContainer>
          <ContentContainer>
            <p dangerouslySetInnerHTML={{ __html: html }} />
            <SkillsContainer>
              {skills && skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
            </SkillsContainer>
          </ContentContainer>
        </FlexContainer>
      </AboutContainer>
    );
  }
}

export default About;
