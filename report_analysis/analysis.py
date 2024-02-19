# Importing required libraries
from pymongo import MongoClient
import pandas as pd

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/POS')

# Select database and collection
db = client['POS']
collection = db['orders']

# Get the orders collection
orders_collection = db['orders']

# Define a function to extract and transform the data
def extract_and_transform(order):
    extracted_data = {
        '_id': order['_id'],
        'cartItems': [{'id': item['id'], 'productName': item['productName']} for item in order['cartItems']]
    }
    print(extracted_data)
    return extracted_data

# Iterate through each document in the orders collection, extract relevant data, and store in a new collection
new_collection = db['extracted_data']  # Replace 'extracted_data' with your desired new collection name
for order in orders_collection.find():
    extracted_data = extract_and_transform(order)
    new_collection.insert_one(extracted_data)

print("Extraction and transformation complete. Data stored in new collection.")
