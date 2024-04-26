/**
 * @swagger
 * /testnet/lockup:
 *   delete:
 *     summary: Changes the status of a lockup to cancelleded on the DB.
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
 *       200:
 *         description: Successfully saved the cancelled lockup on the DB
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
 *                   example: Successfully saved the cancelled lockup on the DB
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
 *                     example: Failed to save the cancelled lockup
 *                   result:
 *                     type: object
 *                     example: {}
 */
