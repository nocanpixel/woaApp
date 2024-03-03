import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
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
          ],
        }),
      ],
    },
  ],
})