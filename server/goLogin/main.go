package main

import (
	"goLogin/database"
	"goLogin/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()

	app := fiber.New()

	//cors is important for port management
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	})) //AllowCreds allows client to send and recieve the cookies

	routes.Setup(app)

	app.Listen(":3001")
}
