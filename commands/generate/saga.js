module.exports = {
  description: 'Generates a saga with an optional test.',
  run: async function (toolbox) {
    // grab some features
    const { parameters, ignite, print, strings } = toolbox
    const { pascalCase, kebabCase, isBlank } = strings

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate saga <name>\n`)
      print.info('A name is required.')
      return
    }

    const name = pascalCase(parameters.first)
    const fileName = kebabCase(name)
    const props = { name, fileName }

    const jobs = [
      { template: `saga.ejs`, target: `src/sagas/${fileName}-sagas.js` },
      { template: `saga-test.ejs`, target: `tests/sagas/${fileName}-sagas.js` }
    ]

    // make the templates
    await ignite.copyBatch(toolbox, jobs, props)
  }
}
