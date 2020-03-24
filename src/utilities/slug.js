import slugify from 'slugify'

export default name => slugify(name, { strict: true, lower: true })
