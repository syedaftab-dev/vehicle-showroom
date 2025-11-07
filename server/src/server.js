import { createApp } from './app.js';

import { config } from './config/env.js';

createApp().then((app) => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
