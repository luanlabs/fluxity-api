/**
 * @swagger
 * /subscribers:
 *   post:
 *     tags:
 *       - Subscribers
 *     summary: Add a new subscriber
 *     description: Endpoint to add a new subscriber to the mailing list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The subscriber's email address.
 *             required:
 *               - email
 *             example:
 *               email: user@example.com
 *     responses:
 *       201:
 *         description: Subscriber added successfully.
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
 *                   example: Subscriber saved successfully
 *                 result:
 *                   $ref: '#/components/schemas/Subscriber'
 *       400:
 *         description: Bad request when input validation fails.
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
 *                   example: Invalid email format
 *                 result:
 *                   type: object
 *                   example: {}
 *       409:
 *         description: Conflict when email is already registered.
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
 *                   example: Email already joined
 *                 result:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Internal server error when operation cannot be completed.
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
 *                   example: An error occurred while processing your request
 *                 result:
 *                   type: object
 *                   example: {}
 */