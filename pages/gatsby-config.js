require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID;

module.exports = {
	siteMetadata: {
		siteTitle: `Quantum`,
		siteTitleAlt: `Quantum - I create noice and easy to remember URLs for you`,
		siteHeadline: `Quantum - I create noice and easy to remember URLs for you`,
		siteUrl: `https://app.nitr.one/`,
		siteDescription: `I create noice and easy to remember URLs for you`,
		siteLanguage: `en`,
		siteImage: `/banner.jpg`,
		author: `@designrknight`,
		// You can overwrite values here that are used for the SEO component
		// You can also add new values here to query them like usual
		// See all options: https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-cara/gatsby-config.js
		siteTitleAlt: `Quantum - I create noice and easy to remember URLs for you`,
	},
	plugins: [
		{
			resolve: `@lekoarts/gatsby-theme-cara`,
			// See the theme's README for all available options
			options: {},
		},
		googleAnalyticsTrackingId && {
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: process.env.GOOGLE_ANALYTICS_ID,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Quantum - I create noice and easy to remember URLs for you`,
				short_name: `Quantum`,
				description: `I create noice and easy to remember URLs for you`,
				start_url: `/`,
				background_color: `#141821`,
				theme_color: `#f6ad55`,
				display: `standalone`,
				icons: [
					{
						src: `/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/android-chrome-512x512.png`,
						sizes: `512x512`,
						type: `image/png`,
					},
				],
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-gatsby-cloud`,
		`gatsby-plugin-netlify`,
		shouldAnalyseBundle && {
			resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
			options: {
				analyzerMode: `static`,
				reportFilename: `_bundle.html`,
				openAnalyzer: false,
			},
		},
	].filter(Boolean),
};
