const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    Plugins: [
        autoprefixer,
        cssnano({preset: 'default'})
    ]
};