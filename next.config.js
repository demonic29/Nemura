// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  /**
   * @param {any} config - webpack の設定オブジェクト
   */
  webpack(config) {
    const rules = config.module?.rules ?? []

    const fileLoaderRule = rules.find(
      /**
       * @param {any} rule
       */
      rule => rule && rule.test instanceof RegExp && rule.test.test('.svg')
    )

    if (fileLoaderRule) {
      if (Array.isArray(fileLoaderRule.exclude)) {
        fileLoaderRule.exclude.push(/\.svg$/)
      } else {
        fileLoaderRule.exclude = [/\.svg$/]
      }
    }

    config.module?.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            exportType: 'default',
            namedExport: 'ReactComponent',
          },
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig