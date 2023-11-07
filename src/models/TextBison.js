const { sendRequest } = require('../util/google_foundation_model');

class TextBison {
  constructor() {
    console.info(`init:${this.constructor.name}`);
  }

  async send(content) {
    const params = {
      apiEndpoint: 'us-central1-aiplatform.googleapis.com',
      projectId: 'vision-ai-demo-402815',
      modelId: 'text-bison@001',
      instances: [
        {
          content: 'how long can a horse ride per day?',
        },
      ],
      parameters: {
        temperature: 0.2,
        maxOutputTokens: 256,
        topP: 0.8,
        topk: 40,
      },
    };

    const response = await sendRequest(params);
    return response;
  }
}

module.exports = TextBison;
