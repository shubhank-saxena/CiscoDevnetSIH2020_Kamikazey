import React, { useState } from 'react';
import { Drawer } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { changeLang, resetState } from '../../redux/actions';
import { useDispatch, connect } from 'react-redux';
function LangToggle({ isAuthenticated }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <IconContainer>
      <GlobalOutlined
        onClick={() => {
          showDrawer();
        }}
      />
      <Drawer
        title="Select Language"
        placement={'right'}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'key'}
      >
        <LanguageOption onClick={() => dispatch(changeLang('en'))}>
          English
        </LanguageOption>
        <LanguageOption onClick={() => dispatch(changeLang('hi'))}>
          हिन्दी
        </LanguageOption>
        <LanguageOption onClick={() => dispatch(changeLang('guj'))}>
          ગુજરાતી
        </LanguageOption>
        <LanguageOption onClick={() => dispatch(changeLang('pun'))}>
          ਪੰਜਾਬੀ
        </LanguageOption>
        <LanguageOption onClick={() => dispatch(changeLang('tel'))}>
          Telugu
        </LanguageOption>
        {isAuthenticated && (
          <LanguageOption onClick={() => dispatch(resetState())}>
            LOGOUT!
          </LanguageOption>
        )}
      </Drawer>
    </IconContainer>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(LangToggle);

const IconContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1em 2em;
  font-size: 40px;
  cursor: pointer;
  z-index: 999;
`;

const LanguageOption = styled.h3`
  padding-bottom: 5px;
  border-bottom: 0.5px solid #f3f3f3;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    color: black;
    border-bottom: 0.5px solid grey;
    opacity: 1;
  }
`;
