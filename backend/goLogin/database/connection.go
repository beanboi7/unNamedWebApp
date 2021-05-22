package database

import (
	"goLogin/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB //global var for adding into the DB, used in controllers

func Connect() {
	env := godotenv.Load()
	if env != nil {
		log.Fatal("Can't open DB password")
	}

	pass := os.Getenv("DBPASSWORD")
	connectionString := "root:" + pass + "@/goLogin"

	connection, err := gorm.Open(mysql.Open(connectionString), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
