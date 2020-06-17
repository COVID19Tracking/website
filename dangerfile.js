import danger, { message, fail, markdown } from 'danger'

const scssFiles = danger.git.modified_files
  .concat(danger.git.created_files)
  .filter(file => file.search(/src\/(.*).scss/) > -1)

const checkFiles = () => {
  return new Promise((resolve, reject) => {
    const scssErrors = {
      noSpacing: [],
      toRem: [],
      fontSize: [],
    }
    scssFiles.forEach((file, index) => {
      danger.git.structuredDiffForFile(file).then(diff => {
        diff.chunks.forEach(chunk => {
          chunk.changes.forEach(change => {
            if (
              change.type === 'add' &&
              change.content.search('ignore-style-rule') === -1
            ) {
              if (
                (change.content.search('margin') > -1 ||
                  change.content.search('padding') > -1) &&
                change.content.search('spacer') === -1 &&
                change.content.search('toRem') === -1
              ) {
                // Capture any margin or padding that doesn't use spacer
                if (typeof scssErrors.noSpacing[file] === 'undefined') {
                  scssErrors.noSpacing[file] = []
                }
                scssErrors.noSpacing[file].push({
                  line: change.ln,
                  content: change.content,
                })
              }
              if (
                (change.content.search('margin') > -1 ||
                  change.content.search('padding') > -1) &&
                change.content.search('toRem') > -1
              ) {
                // Capture any margin or padding that uses toRem
                if (typeof scssErrors.toRem[file] === 'undefined') {
                  scssErrors.toRem[file] = []
                }
                scssErrors.toRem[file].push({
                  line: change.ln,
                  content: change.content,
                })
              }
              if (change.content.search('font-size') > -1) {
                // Capture any font-size
                if (typeof scssErrors.fontSize[file] === 'undefined') {
                  scssErrors.fontSize[file] = []
                }
                scssErrors.fontSize[file].push({
                  line: change.ln,
                  content: change.content,
                })
              }
            }
          })
        })
        if (index === scssFiles.length - 1) {
          resolve(scssErrors)
        }
      })
    })
  })
}

checkFiles().then(errors => {
  if (Object.keys(errors.noSpacing).length) {
    fail(
      `There are ${
        Object.keys(errors.noSpacing).length
      } SCSS changes that use absolute values for margin or padding. Use \`spacer()\` mixin instead.`,
    )
    markdown('## Margin and padding')
    markdown(
      'The following lines use margin and padding without our `spacer` mixins:',
    )
    Object.keys(errors.noSpacing).forEach(file => {
      markdown(`\`${file}\``)
      errors.noSpacing[file].forEach(line => {
        markdown(`- **Line ${line.line}**: \`${line.content}\``)
      })
    })
  }

  if (Object.keys(errors.fontSize).length) {
    fail(
      `There are ${
        Object.keys(errors.fontSize).length
      } SCSS changes that use \`font-size\` instead of the \`type-size\` mixin.`,
    )
    markdown('## Font size')
    markdown(
      'The following lines use `font-size` instead of the `type-size` mixin:',
    )
    Object.keys(errors.fontSize).forEach(file => {
      markdown(`\`${file}\``)
      errors.fontSize[file].forEach(line => {
        markdown(`- **Line ${line.line}**: \`${line.content}\``)
      })
    })
  }

  if (Object.keys(errors.toRem).length) {
    message(
      `There are ${
        Object.keys(errors.noStoRempacing).length
      } SCSS changes that use \`toRem\` instead of the \`spacer\` mixin.`,
    )
    markdown('## toRem')
    markdown('The following lines use `toRem`:')
    Object.keys(errors.noSpacing).forEach(file => {
      markdown(`\`${file}\``)
      errors.noSpacing[file].forEach(line => {
        markdown(`- **Line ${line.line}**: \`${line.content}\``)
      })
    })
  }
})
