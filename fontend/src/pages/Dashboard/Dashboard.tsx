import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Menu, message, Switch } from 'antd';
import { Input, Button } from 'antd';

const Dashboard = (props: any) => {
  const [authInfo, setaAuthInfo] = useState<any>();
  const [channelInfo, setChannelInfo] = useState<any>();
  const [newMessage, setNewMessage] = useState('');
  const [channelId, setChannelId] = useState('');
  const [slackAuthenticated, setSlackAuthenticated] = useState(false);
  const [workFlowToggle, setWorkFlowToggle] = useState(true);

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    const parsed = queryString.parse(window.location.search);
    if (Object.values(parsed).length > 0) {
      setSlackAuthenticated(true);
    }
  };

  const onClick = ({ key }: any) => {
    setChannelId(key);
    message.info(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={onClick}>
      {channelInfo?.map((channel: any) => {
        return <Menu.Item key={channel?.id}>{channel?.name}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <div
      style={{
        marginTop: '10%',
        marginLeft: '15%',
        border: '1px solid grey',
        width: '70%',
        padding: 100,
        borderRadius: 20,
      }}
    >
      <div>
        <Input
          size={'large'}
          style={{ width: 300, marginRight: 20 }}
          placeholder="Store name"
        />
        <Button
          onClick={() => {
            sendMessage();
          }}
          style={{ marginTop: 20, marginRight: 20 }}
          type="primary"
          size={'large'}
        >
          Select Store
        </Button>
        <span>Not- connected</span>
      </div>

      <div style={{ marginTop: 20 }}>
        <a
          style={{ width: 300, marginRight: 150, marginTop: 100 }}
          href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=2190247504448.2167972843587"
        >
          <img src="https://api.slack.com/img/sign_in_with_slack.png" />
        </a>
        <span style={{ marginLeft: 125 }}>{'Not - Connected'}</span>
      </div>

      <div style={{ marginTop: 20 }}>
        <span>Work-flow-off</span>
        <Switch
          style={{ marginLeft: 10, marginRight: 10 }}
          defaultChecked
          onChange={() => {
            setWorkFlowToggle(!workFlowToggle);
          }}
        />
        <span>Work-flow-on</span>
      </div>

      <div>
        <Button
          onClick={() => {
            localStorage.removeItem('token');
            props.history.push('/');
          }}
          style={{ marginTop: 20 }}
          type="primary"
          size={'large'}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
