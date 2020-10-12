import slugify from 'slugify'

const slugifyList = children => {
  let text = ''
  children.forEach(child => {
    if (typeof child === 'string') {
      text += ' '
      text += child
    }
  })
  return slugify(text, { lower: true })
}

const slugifyContentList = children => {
  let text = ''
  children.forEach(child => {
    if (child.nodeType === 'text') {
      text += ' '
      text += child.value
    }
  })
  return slugify(text, { lower: true })
}

export { slugifyList, slugifyContentList }
