// Inserts some statement in a file
function insertInFile (toolbox, filePath, statement, pattern = '') {
  const { print, ignite, filesystem } = toolbox

  if (!filesystem.exists(filePath)) {
    const msg = `No '${filePath}' file found.  Can't insert in such a file.`
    print.error(msg)
    process.exit(1)
  }

  ignite.patchInFile(filePath, {
    after: pattern,
    insert: statement
  })
}

module.exports = {
  insertInFile
}
