// testing.env || prod.env || dev
// based on your environment

if (!process.env.DOTENV) {
  throw new Error('Please add your configurations in config/*.env file.');
}

interface IConfig {
  PORT: string;
  MONGODB_URI: string;
}

const config: IConfig = {
  PORT: '',
  MONGODB_URI: '',
};

const keys = Object.keys(config) as [keyof IConfig];
keys.forEach((k): void => {
  if (!process.env[k]) {
    const errorMessage = `Please add ${k} key to your config/*.env file`;

    throw new Error(errorMessage);
  }

  config[k] = process.env[k] as string;
});

export default config;
