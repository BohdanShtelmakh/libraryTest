require('dotenv').config()

const apps = []

if (process.env.NODE_ENV === 'development') {
  apps.push({
    name: 'library-app',
    script: "node app.js",
    // args: "--files --respawn -r tsconfig-paths/register src/index.ts",
    watch: false,
    // node_args: '-r tsconfig-paths/register',
    ignore_watch: ['./data', 'node_modules', '.history', '.git', 'public', 'root', '.env', '.wwebjs_auth'],
  })
} else {
  apps.push({
    name: 'library-app',
    script: 'node app.js',
    watch: false,
  })
}

module.exports = { apps }