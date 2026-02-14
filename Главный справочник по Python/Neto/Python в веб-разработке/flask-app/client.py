import requests

res = requests.post("http://127.0.0.1:9999/hello/world/23/", json={"name": "user_1", "password": "1234"})
print(res.text)
print(res.status_code)
