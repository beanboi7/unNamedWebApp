package controllers

import (
	"goLogin/database"
	"goLogin/models"
	"os"

	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
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

var SecretKey string = ""

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

	//else if right password was given, a token is made and stored in server

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	env := godotenv.Load()
	if env != nil {
		return env
	}
	key := os.Getenv("SECRETKEY")
	SecretKey = key
	token, err := claims.SignedString([]byte(key))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}
	// The token doesn't need to be given out when POST req, so store it as cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	//This ensures frontend only gets the cookie for auth purposes and cant be retrived
	//or manipulated with

	return c.JSON(fiber.Map{
		"message": "success ley",
	})

}

func User(c *fiber.Ctx) error {
	//This function gets the user's status by getting the token via cookie

	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.SendStatus(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthorised",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)

}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:    "jwt",
		Value:   "",
		Expires: time.Now().Add(-time.Hour),
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Successfully logged out",
	})
}
