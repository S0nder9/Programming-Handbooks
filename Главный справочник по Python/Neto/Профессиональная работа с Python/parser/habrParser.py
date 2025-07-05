from bs4 import BeautifulSoup
import requests
from fake_headers import Headers

response = requests.get("https://www.iplocation.net")
html_data = response.text

headers = Headers(os="win", browser="chrome")

headers_dict = headers.generate()

response = requests.get("https://habr.com/ru/articles/", headers=headers_dict)
html_data = response.text
soup = BeautifulSoup(html_data, "lxml")

# 

article_list = soup.find("div", class_="tm-articles-list")
articles = article_list.find_all("article")

articles_data = []

for article_tag in articles:
    user_name_tag = article_tag.find("a", class_="tm-user-info__username")
    user_name = user_name_tag.text.strip()

    time_tag = article_tag.find("time")
    date_time = time_tag["datetime"]

    article_link_tag = article_tag.find("a", class_="tm-title__link")
    link_relative = article_link_tag["href"]
    link_absolute = f"https://habr.com{link_relative}"

    title = article_link_tag.text.strip()

    response = requests.get(link_absolute, headers=headers_dict)

    article_html_data = response.text
    article_main_soup = BeautifulSoup(article_html_data, "lxml")
    article_body_tag = article_main_soup.find("div", id="post-content-body")
    article_body_text = article_body_tag.text.strip()[0:100]
    presenter_header_tag = article_main_soup.find("div", class_="tm-article-presenter__header")
    views_tag = presenter_header_tag.find("span",  class_="tm-icon-counter__value")
    if views_tag:
        views = views_tag.text.strip()

    else:
        views = None

    articles_data.append({
        "user_name": user_name,
        'datetime': date_time,
        "Link": link_absolute,
        'title': title,
        'text': article_body_text,
        "views": views 
    })

print("Данные: ", articles_data)