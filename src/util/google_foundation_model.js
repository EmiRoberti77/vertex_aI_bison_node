const { GoogleAuth } = require('google-auth-library');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
console.info('auth_path', process.env.SCOPES);

function ERROR(msg) {
  return `ERROR:${msg}`;
}

async function sendRequest(options) {
  const auth = new GoogleAuth({
    scopes: process.env.SCOPES,
  });
  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  if (!accessToken) {
    console.error('access token failed');
    return;
  }

  const data = {
    instances: options.instances,
    parameters: options.parameters,
  };

  const endpoint = `https://${options.apiEndpoint}/v1/projects/${options.projectId}/locations/us-central1/publishers/google/models/${options.modelId}:predict`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(ERROR('http response'));
    throw new Error(ERROR(`http response status:${response.status}`));
  }

  return await response.json();
}

module.exports = {
  sendRequest,
};
