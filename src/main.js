const TextBison = require('./models/TextBison');

const textBisonModel = new TextBison();

textBisonModel
  .send()
  .then((response) => {
    console.info(response);
  })
  .catch((error) => console.error(error));
