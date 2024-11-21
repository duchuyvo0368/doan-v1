import requests

# Define the URL of the API
url = "http://localhost:8003/api/get-all-product-user-recommend"

try:
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for product in data.get("data", []):
            images = product.get("images", [])
            for image in images:
                print(image)
    else:
        print(f"Error: Unable to fetch data. Status code {response.status_code}")

except Exception as e:
    print(f"An error occurred: {e}")
