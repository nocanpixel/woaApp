import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 2,
  tables: [
    // We'll add tableSchemas here later  
    tableSchema({
      name: 'cups',
      columns: [
        { name: 'date', type: 'string', isIndexed: true },
        { name: 'glass1', type: 'boolean'},
        { name: 'glass2', type: 'boolean'},
        { name: 'glass3', type: 'boolean'},
        { name: 'glass4', type: 'boolean'},
        { name: 'glass5', type: 'boolean'},
        { name: 'glass6', type: 'boolean'},
        { name: 'glass7', type: 'boolean'},
        { name: 'glass8', type: 'boolean'},
        { name: 'total', type: 'number'},
      ]
    })
  ]
})