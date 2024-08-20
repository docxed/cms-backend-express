const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const path = require('path')

const loadYamlFile = (filePath) => {
  try {
    return yamljs.load(path.resolve(__dirname, filePath))
  } catch (error) {
    console.error(`Error loading YAML file ${filePath}:`, error)
    return {}
  }
}

const authDoc = loadYamlFile('../modules/userModule/docs/authDoc.yaml')
const userDoc = loadYamlFile('../modules/userModule/docs/userDoc.yaml')
const blogDoc = loadYamlFile('../modules/blogModule/docs/blogDoc.yaml')

const mergeSwaggerDocs = (docs) => {
  const mergedDoc = {
    openapi: '3.0.0',
    info: {
      title: 'CMS Backend API',
      version: '1.0.0',
      description: 'API documentation for CMS Backend',
    },
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {},
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  }

  docs.forEach((doc) => {
    if (doc.paths) {
      mergedDoc.paths = { ...mergedDoc.paths, ...doc.paths }
    }
    if (doc.components) {
      if (doc.components.schemas) {
        mergedDoc.components.schemas = {
          ...mergedDoc.components.schemas,
          ...doc.components.schemas,
        }
      }
      if (doc.components.securitySchemes) {
        mergedDoc.components.securitySchemes = {
          ...mergedDoc.components.securitySchemes,
          ...doc.components.securitySchemes,
        }
      }
    }
  })

  return mergedDoc
}

const swaggerDocument = mergeSwaggerDocs([authDoc, userDoc, blogDoc])

module.exports = {
  swaggerUi,
  swaggerDocument,
}
