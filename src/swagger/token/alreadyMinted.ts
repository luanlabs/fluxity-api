/**
 * @swagger
 * /token/already-minted/{user}:
 *   get:
 *     summary: Returns if user has already minted tokens.
 *     tags: [token]
 *     parameters:
 *       - name: user
 *         in: path
 *         description: User public
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *
 *     responses:
 *       200:
 *         description: Returns true if user has already minted tokens
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
 *                   example: User has already minted tokens
 *                 result:
 *                   type: object
 *                   example: {
 *                     minted: true
 *                   }
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
 *                     example: Failed to get user already minted tokens
 *                   result:
 *                     type: object
 *                     example: {}
 *
 *
 */
