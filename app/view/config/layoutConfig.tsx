import React from 'react';
import {
  Link, useIntl, getLocale, setLocale,
  history
} from 'umi';
import { Avatar, Button, Divider, Dropdown, Menu } from 'antd';
import { DefaultFooter } from '@ant-design/pro-layout';

const rightRender = (initInfo: any) => {
    const intl = useIntl();
    const locale = getLocale();
    const { member } = initInfo;

    console.log('initInfo', initInfo);

    // locale
    const localeNode = (
      <Button
        size="small"
        onClick={() => {
          const target = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
          setLocale(target);
        }}
      >
        {locale === 'zh-CN' ? 'Chinese' :'English'}
      </Button>
    );

    const menu = (
      <Menu onClick={({ key }) => {
        if(key === 'logout') {
          window.localStorage.removeItem('auth');
          window.location.reload();
        }
      }}>
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    );

    // user
    if (member) {
      const { email, avatar } = member;
      return (
        <div>
          {localeNode}

          <Divider type="vertical" />

          <Dropdown overlay={menu}>
          <Avatar src={avatar}>{email}</Avatar>
          </Dropdown>
        </div>
      );
    }

    // no user
    return (
      <div>
        {localeNode}
        <Divider type="vertical" />

        <Link to="/login">
          {intl.formatMessage({
            id: 'menu.login',
          })}
        </Link>
      </div>
    );
}

export default {
  rightRender,
  logout: () => {},
  footerRender: () => <DefaultFooter links={false} copyright="Ergate.js" />,
};