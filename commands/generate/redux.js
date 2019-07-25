module.exports = {
  description: ' Generates a action/creator/reducer set for Redux.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, ignite, strings, print } = toolbox
    const { isBlank, pascalCase, kebabCase } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate redux <name>\n`)
      print.info('A name is required.')
      return
    }

    const name = pascalCase(parameters.first)
    const fileName = kebabCase(name)
    const props = { name, fileName }

    const jobs = [
      { template: `redux.ejs`, target: `src/rdx/${fileName}-redux.js` },
      { template: `redux-test.ejs`, target: `tests/rdx/${fileName}-redux-test.js` }
    ]

    await ignite.copyBatch(toolbox, jobs, props)
  }
}
