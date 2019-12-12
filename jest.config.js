  
module.exports = {
	projects: [
	  {
		displayName: 'e2e',
		preset: 'jest-puppeteer',
		testMatch: ['<rootDir>/**/*.e2e.+(js|ts){,x}'],
		setupFilesAfterEnv: [require.resolve('./__tests__/setup')]
	  },
	  {
		displayName: 'jsdom',
		testEnvironment: 'jsdom',
		testMatch: [
			"<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
			"<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
		  ],
		transform: {
		  '^.+\\.(js|jsx|ts|tsx)$': require.resolve('babel-jest'),
		  '^.+\\.css$': require.resolve(
			'./config/jest/cssTransform.js'
		  ),
		  '^(?!.*\\.(js|jsx|mjs|css|json)$)': require.resolve(
			'./config/jest/fileTransform.js'
		  )
		},
		transformIgnorePatterns: [
			"[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
			"^.+\\.module\\.(css|sass|scss)$"
		  ],
	  }
	]
  };