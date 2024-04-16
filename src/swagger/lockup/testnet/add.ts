/**
 * @swagger
 * /testnet/lockup:
 *   post:
 *     summary: Adds a newly created lockup to the DB.
 *     tags: [lockup (testnet)]
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
 *       201:
 *         description: Save lockup to db
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
 *                   example: Save lockup to db
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
 *                     example: Failed to save the lockup
 *                   result:
 *                     type: object
 *                     example: {}
 */
