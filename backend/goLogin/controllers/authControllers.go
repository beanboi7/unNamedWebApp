package controllers

import (
	"goLogin/database"
	"goLogin/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	//you need this data to be passed so that one gets to see
	//what is passed as POST req via postmman interface

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 15)
	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)

	// "name": "kewkman",
	// "password": "aaivardhu",
	// "email": "vasanthandco@gmail.com" use when login

	return c.JSON(user)
}
