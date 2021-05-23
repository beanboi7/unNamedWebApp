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

	return c.JSON(user)
}

// "name": "kewkman",
// "password": "aaivardhu",
// "email": "vasanthandco@gmail.com" use when login

func Login(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)
	if err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)

	//when such a user is not found in db
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found in DB",
		})
	}

	//if user is found,we check for password
	passError := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))
	if passError != nil {
		return c.JSON(fiber.Map{
			"message": "Incorrect Password was given",
		})
	}

	//else if right password was given, we display the user from db
	return c.JSON(user)
}
