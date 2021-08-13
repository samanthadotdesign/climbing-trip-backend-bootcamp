// db is an argument to this function so
// that we can make db queries inside
export default function initRoutesController(db) {
  // [1] View routes
  const index = (request, response) => {
    db.Route.findAll()
      .then((routes) => {
        response.send({ routes });
      })
      .catch((error) => console.log(error));
  };

  // [2] Add route, send back the successful route
  const add = async (req, res) => {
    const { currentRoute } = req.body;
    try {
      const newRoute = await db.Route.create({
        name: currentRoute,
        tripId: 1,
      });
      res.send(newRoute);
    } catch (error) {
      console.log(error);
    }
  };

  // updates the route difficulty
  const update = async (req, res) => {
    const { id, difficultyInput } = req.body;
    try {
      const routeToUpdate = await db.Route.findByPk(id);
      routeToUpdate.difficulty = difficultyInput;
      // Save the changes inside the routeToUpdate object
      await routeToUpdate.save();
      res.send(routeToUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index, add, update,
  };
}

/**
 * {routes: [ {}, {}, {}, ]}
 */
