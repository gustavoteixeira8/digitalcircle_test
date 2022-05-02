package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Record struct {
	Id      int       `json:"id"`
	ColText string    `json:"colText"`
	ColDt   time.Time `json:"colDt"`
}

type JsonResponse struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}

func getDotenv(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env")
	}

	return os.Getenv(key)
}

func connectDatabase() *sql.DB {
	databaseConfig := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		getDotenv("DATABASE_HOST"),
		getDotenv("DATABASE_PORT"),
		getDotenv("DATABASE_USER"),
		getDotenv("DATABASE_PASSWORD"),
		"postgres",
	)

	database, err := sql.Open("postgres", databaseConfig)

	if err != nil {
		log.Fatalf("Database error %s", err)
	}

	return database
}

func getBody(req *http.Request) (map[string]string, error) {
	var body map[string]string
	err := json.NewDecoder(req.Body).Decode(&body)

	return body, err
}

func returnJsonResponse(res http.ResponseWriter, message string, status int) {
	jsonResponse := JsonResponse{Message: message, Status: status}

	json.NewEncoder(res).Encode(jsonResponse)
}

func configureHttpHeaders(res http.ResponseWriter) {
	res.Header().Set("Access-Control-Allow-Origin", "*")
	res.Header().Set("Content-type", "application/json")
}

func CreateNewRecord(res http.ResponseWriter, req *http.Request) {
	configureHttpHeaders(res)

	body, _ := getBody(req)
	colText := body["col_text"]

	if len(colText) == 0 {
		res.WriteHeader(400)
		returnJsonResponse(res, "col_text is required", 400)
		return
	}

	var newRecord Record

	newRecord.ColText = colText
	newRecord.ColDt = time.Now()

	database := connectDatabase()
	createRecordQuery := "INSERT INTO tb01 (col_text, col_dt) values ($1, $2);"

	_, err := database.Query(createRecordQuery, newRecord.ColText, newRecord.ColDt)

	if err != nil {
		res.WriteHeader(500)
		returnJsonResponse(res, "Internal error", 500)
		return
	}

	res.WriteHeader(200)
	returnJsonResponse(res, "Record created successfully", 200)
}

func main() {
	router := http.NewServeMux()

	router.HandleFunc("/tb01", CreateNewRecord)

	fmt.Println("Server listening on port 5000")
	http.ListenAndServe(":5000", router)
}
