package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() {
	env := godotenv.Load()
	if env != nil {
		log.Fatal("Can't open DB password")
	}

	pass := os.Getenv("DBPASSWORD")
	connectionString := "root:" + pass + "@/goLogin"

	_, err := gorm.Open(mysql.Open(connectionString), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}
}
