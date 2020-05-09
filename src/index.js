const I18NextJoinLoader = require('./I18NextJoinLoader')

I18NextJoinLoader.loader = function() { return require.resolve('./I18NextJoinLoader') }

module.exports = I18NextJoinLoader
