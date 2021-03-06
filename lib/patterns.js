const constants = {
  PATTERN_IMPORTS: 'imports',
  PATTERN_EXPORTS: 'exports',
  PATTERN_ROUTES: 'routes'
}
//  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+'react-navigation';?`,

module.exports = {
  constants,

  [constants.PATTERN_IMPORTS]: `import { createStackNavigator, createAppContainer } from 'react-navigation'`,
  [constants.PATTERN_EXPORTS]: '',
  [constants.PATTERN_ROUTES]: 'const PrimaryNav'
}
