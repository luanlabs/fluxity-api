/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: apiKey
 *       in: header
 *       name: authorization
 *   schemas:
 *     Subscriber:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the subscriber.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the subscriber was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the subscriber was last updated.
 *       example:
 *         email: example@example.com
 *         createdAt: '2021-01-01T00:00:00Z'
 *         updatedAt: '2021-01-01T00:00:00Z'
 */

/**
 * @swagger
 * /subscribe:
 *   get:
 *     tags:
 *       - Subscribe
 *     summary: Retrieves a list of all subscribers.
 *     description: This endpoint retrieves all the subscribers from the database.
 *     security:
 *       - Authorization: [] 
 *     responses:
 *       200:
 *         description: A list of subscribers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Subscribers found successfully
 *                 result:
 *                   $ref: '#/components/schemas/Subscriber'
 *       500:
 *         description: Internal server error when the operation fails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request.
 *                 result:
 *                   type: object
 */