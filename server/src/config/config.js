module.exports = {
  'database': (function() {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return 'mongodb://localhost/hipchatCloneApi';
    } else {
      return 'mongodb://mongo:27017/hipchatCloneApi';
    }
  })(),
  'port': (function() {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return 3001;
    } else {
      return 80;
    }
  })(),
  'databaseTest': 'mongodb://localhost/hipchatCloneApiTest',
  'secret': 'apitest'
};