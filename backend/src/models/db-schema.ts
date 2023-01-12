const mysqlSchema = require("mysql-schema");

const drawSchema = () => mysqlSchema.getSchema({
    user:            process.env.DB_USER           || 'root',
    password:        process.env.DB_PASSWORD       || '',
    host:            process.env.DB_HOST           || 'localhost',
    port:            process.env.DB_PORT           || '3306',
    database:        process.env.DB_DATABASE       || 'test',
    configurations:  process.env.DB_CONFIGURATIONS || false,
    extensions:      process.env.DB_EXTENSIONS     || false,
    asJson:          false,
    output:          `./schema.${process.env.DB_DATABASE}.js`
});

module.exports = drawSchema;