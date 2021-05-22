package models

type User struct {
	Id       uint `gorm:"primary"`
	Name     string
	Email    string `gorm:"unique"`
	Password []byte
}
