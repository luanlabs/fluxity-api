/**
 * @swagger
 * /health:
 *   get:
 *     summary: Liveness/readiness probe.
 *     tags: [system]
 *     responses:
 *       200:
 *         description: Service is healthy and the database is connected.
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
 *                   example: OK
 *                 result:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       example: 123.45
 *                     db:
 *                       type: string
 *                       example: connected
 *       503:
 *         description: The database is not connected.
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
 *                   example: Database not connected
 *                 result:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       example: 123.45
 *                     db:
 *                       type: string
 *                       example: disconnected
 */
