require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 2500

const db = require('./DL/db')
db.connect();

const cors = require('cors');
app.use(cors());
app.use(express.json());



const campaignRouter = require('./routes/campaign.router');
app.use('/campaign', campaignRouter);
const leadRouter = require('./routes/lead.router');
app.use('/lead', leadRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc'); // Add this line
const swaggerDocument = require('./swagger.json');

const options = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'How to use Routes?', 
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:2500/' 
            }
        ]
    },
    apis: ['./routes/*.router.js'] 
};

const swaggerSpec = swaggerJSDoc(options); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Campaign
 *   - name: User
 *   - name: Lead
 */


app.listen(PORT, () => console.log(`****server is listening on ${PORT}****`))