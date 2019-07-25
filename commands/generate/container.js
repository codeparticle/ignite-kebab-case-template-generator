const patterns = require('../../lib/patterns')

module.exports = {
  description: 'Generates a redux smart component.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, strings, print, ignite, filesystem } = toolbox
    const { pascalCase, kebabCase, isBlank } = strings
    const config = ignite.loadIgniteConfig()
    const options = parameters.options || {}

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate container <name>\n`)
      print.info('A name is required.')
      return
    }

    const name = pascalCase(parameters.first)
    const fileName = kebabCase(name)
    const props = { name, fileName }

    const jobs = [
      {
        template: 'container.ejs',
        target: `src/containers/${fileName}/${fileName}.js`
      },
      {
        template: 'index.ejs',
        target: `src/containers/${fileName}/index.js`
      },
      {
        template: 'container-style.ejs',
        target: `src/containers/${fileName}/${fileName}-styles.js`
      }
    ]

    await ignite.copyBatch(toolbox, jobs, props)

    const componentsFilePath = `${process.cwd()}/src/containers/index.js`
    const exportToAdd = `export { ${name} } from './${fileName}';`

    if (!filesystem.exists(componentsFilePath)) {
      const msg = `No '${componentsFilePath}' file found.  Can't insert container.`
      print.error(msg)
      process.exit(1)
    }

    // insert component export
    ignite.patchInFile(componentsFilePath, {
      after: patterns[patterns.constants.PATTERN_EXPORTS],
      insert: exportToAdd
    })

    // if using `react-navigation` go the extra step
    // and insert the container into the nav router
    if (config.navigation === 'react-navigation' && options.nav) {
      const containerName = name
      const appNavFilePath = `${process.cwd()}/src/navigation/app-navigation.js`
      const importToAdd = `import { ${containerName} } from 'containers/${fileName}';`
      const routeToAdd = `  ${containerName}: { screen: ${containerName} },`

      if (!filesystem.exists(appNavFilePath)) {
        const msg = `No '${appNavFilePath}' file found.  Can't insert container.`
        print.error(msg)
        process.exit(1)
      }

      // insert container import
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_IMPORTS],
        insert: importToAdd
      })

      // insert container route
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_ROUTES],
        insert: routeToAdd
      })
    } else {
      print.info('Container created, manually add it to your navigation')
    }
  }
}
