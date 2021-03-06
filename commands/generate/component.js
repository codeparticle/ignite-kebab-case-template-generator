const helpers = require('../../lib/helpers')

const { insertInFile } = helpers

module.exports = {
  description: 'Generates a component, styles, and an optional test.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, strings, print, ignite } = toolbox
    const { pascalCase, kebabCase, isBlank } = strings

    const options = parameters.options || {}

    const hasFolder = !isBlank(options.folder)

    // validation
    if (isBlank(parameters.first) && !hasFolder) {
      print.info(`${toolbox.runtime.brand} generate component <name>\n`)
      print.info('A name is required.')
      return
    }

    let componentPath = hasFolder
      ? `${options.folder}/${parameters.first || 'index'}`
      : parameters.first

    let pathComponents = componentPath.split('/')
    let name = pascalCase(pathComponents.pop())

    if (name === 'Index') {
      name = 'index'
    }

    const fileName = kebabCase(name)
    const relativePath = pathComponents.length
      ? pathComponents.join('/') + '/'
      : ''

    const props = { name, fileName }
    const jobs = [
      {
        template: options.func ? 'func-component.ejs' : 'component.ejs',
        target: `src/components/${relativePath}${fileName}/${fileName}.js`
      },
      {
        template: 'index.ejs',
        target: `src/components/${relativePath}${fileName}/index.js`
      },
      {
        template: 'component-style.ejs',
        target: `src/components/${relativePath}${fileName}/${fileName}-styles.js`
      },
      {
        template: 'component-test.ejs',
        target: `tests/components/${relativePath}${fileName}-test.js`
      }
    ]

    if (options.story) {
      jobs.push({
        template: 'component-story.ejs',
        target: `src/stories/components/${relativePath}${fileName}-story.js`
      })
    }

    await ignite.copyBatch(toolbox, jobs, props)

    const componentsFilePath = `${process.cwd()}/src/components/index.js`
    const exportToAdd = `export { ${name} } from './${fileName}';`

    insertInFile(toolbox, componentsFilePath, exportToAdd)

    if (options.story) {
      const componentStoriesFilePath = `${process.cwd()}/src/stories/components/index.js`
      const storyImportToAdd = `import './${fileName}-story';`

      insertInFile(toolbox, componentStoriesFilePath, storyImportToAdd)
    }
  }
}
