package db

import (
	"context"

	"github.com/go.mongodb.org/mongo-driver/mongo"
)

func GetDBCollection() (*mongo.Collection, error) {
	client, err := mongo.Connect(context.TODO(), "mongodb://localhost:27017")

	if err != nil {
		return nil, err
	}

	// to check connextion
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		return nil, err
	}
	collection := client.Database("gologin").Collection("users")

	return collection, nil
}
