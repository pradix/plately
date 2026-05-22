module.exports = {
  apps: [
    {
      name: "plately-beta",
      script: "server.js",
      cwd: "/var/www/plately",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_memory_restart: "350M",
      kill_timeout: 8000,
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3000",
        DATA_DIR: "/var/www/plately/data",
      },
    },
  ],
};
