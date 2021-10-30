export default function routeNotFound(req, res) {
  try {
    const route = req.url || req.originalUrl;
    return res.status(404).send(`Route ${route} not found`);
  } catch (error) {
    return res.sendStatus(500);
  }
}
