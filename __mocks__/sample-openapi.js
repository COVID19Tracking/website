export default {
  components: {
    schemas: {
      States: {
        type: 'object',
        properties: {
          totalTestResults: {
            type: 'integer',
            description: 'Total Test Results Provided by the State',
            nullable: true,
            example: '',
          },
        },
      },
    },
  },
}
