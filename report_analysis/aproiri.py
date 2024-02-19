from pymongo import MongoClient
import pandas as pd  # Import pandas
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['POS']  # Replace 'your_database_name' with your actual database name
collection = db['extracted_data']  # Assuming you stored the extracted data in this collection

# Retrieve the cart items from the MongoDB collection
cart_items_list = []
for doc in collection.find({}, {'cartItems': 1}):
    cart_items_list.append([item['id'] for item in doc['cartItems']])

# Encode the transaction data
te = TransactionEncoder()
te_ary = te.fit(cart_items_list).transform(cart_items_list)
df = pd.DataFrame(te_ary, columns=te.columns_)

# Find frequent itemsets using Apriori algorithm
frequent_itemsets = apriori(df, min_support=0.3, use_colnames=True)

# Generate association rules
association_rules_df = association_rules(frequent_itemsets, metric="lift", min_threshold=1)

# Print association rules
print(association_rules_df)
