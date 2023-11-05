/**
 * @swagger
 * /subscribers:
 *   get:
 *     tags:
 *       - Subscribers
 *     summary: Retrieves a list of all subscribers.
 *     description: This endpoint retrieves all the subscribers from the database.
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscriber'
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