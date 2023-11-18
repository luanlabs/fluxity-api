/**
 * @swagger
 * /testnet/stream:
 *   post:
 *     summary: Add stream to the list streams.
 *     tags: [stream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *                 example : 25
 *
 *
 *     responses:
 *       200:
 *         description: Save stream to db
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
 *                   example: Save stream to db
 *                 result:
 *                     type: object
 *                     example: {}
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: error
 *                   message:
 *                     type: string
 *                     example: Failed to save the stream
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 *
 *
 */
