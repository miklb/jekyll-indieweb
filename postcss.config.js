module.exports = (ctx) => ({
    map: ctx.options.map,
    plugins: {
        'postcss-import': { path: 'assets/css' },
        'postcss-nested': {},
        'postcss-preset-env': {},
        'postcss-custom-properties': {},
        cssnano: { preset: 'default' },
    }
})