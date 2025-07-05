from bs4 import BeautifulSoup
import requests


response = requests.get("https://www.iplocation.net")
html_data = response.text

soup = BeautifulSoup(html_data, "lxml")
tag_span = soup.find("span", class_="table-ip4-home")

text = tag_span.text.strip()
print(text)