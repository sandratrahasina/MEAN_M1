import { objectType } from 'nexus'

const FileType = objectType({
  name: 'File',
  definition(t) {
    t.nonNull.string('filename')
    t.nonNull.string('mimetype')
    t.nonNull.string('encoding')
  },
})

export default FileType
