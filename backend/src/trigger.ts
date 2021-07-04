import * as axios from 'axios';
import User from '../../model/user';
import Credential from '../../model/credential';

export const createTrigger = async (
  userId: string
): Promise<string | undefined> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return;
  }
  const credentials = await Credential.findOne({
    type: 'shopify',
    userId: userId,
  });
  if (!credentials) {
    return;
  }
  const credentialData = credentials.getData();
  const endpoint = `/webhooks.json`;
  const body = {
    webhook: {
      topic: 'orders/create',
      address: '/webhooks.json',
      format: 'json',
    },
  };

  let data;
  try {
    const options: axios.AxiosRequestConfig = {
      headers: { 'X-Shopify-Access-Token': credentialData.accessToken },
      method: 'POST',
      url: `https://${credentialData.subdomain}/admin/api/2021-04${endpoint}`,
      data: body,
    };

    data = await axios.default.request(options);
  } catch (error) {
    console.log(error);
    return;
  }

  if (data.data.webhook && data.data.webhook.id) {
    return data.data.webhook.id;
  } else {
    return;
  }
};

export const deleteTrigger = async (
  userId: string
): Promise<string | undefined> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return;
  }
  const credentials = await Credential.findOne({
    type: 'shopify',
    userId: userId,
  });
  if (!credentials) {
    return;
  }
  const credentialData = credentials.getData();
  const endpoint = `/webhooks.json`;
  const body = {
    webhook: {
      topic: 'orders/create',
      address: '/webhooks.json',
      format: 'json',
    },
  };

  let data;
  try {
    const options: axios.AxiosRequestConfig = {
      headers: { 'X-Shopify-Access-Token': credentialData.accessToken },
      method: 'POST',
      url: `https://${credentialData.subdomain}/admin/api/2021-04${endpoint}`,
      data: body,
    };

    data = await axios.default.request(options);
  } catch (error) {
    console.log(error);
    return;
  }

  if (data.data.webhook && data.data.webhook.id) {
    return data.data.webhook.id;
  } else {
    return;
  }
};
