from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


def wait_element(browser, delay_seconds=10, by=By.TAG_NAME, value=None):
    return WebDriverWait(browser, delay_seconds).until(
        EC.presence_of_element_located((by, value))
    )

chrome_path = ChromeDriverManager().install()
browser_service = Service(executable_path=chrome_path)
options = Options()
options.add_argument("--headless")
options.add_experimental_option("detach", True)
browser = Chrome(service=browser_service, options=options)

browser.get("https://habr.com/ru/articles/")

wait_element(browser, 10, By.CLASS_NAME, "tm-articles-list")

articles_data = []

article_list = browser.find_element(By.CLASS_NAME, "tm-articles-list")
articles = article_list.find_elements(By.TAG_NAME, "article")

for article_tag in articles:
    try:
        user_name_tag = article_tag.find_element(By.CLASS_NAME, "tm-user-info__username")
        user_name = user_name_tag.text.strip()
    except Exception:
        user_name = None
    try:
        time_tag = article_tag.find_element(By.TAG_NAME, "time")
        date_time = time_tag.get_attribute("datetime")
    except Exception:
        date_time = None
    try:
        article_link_tag = article_tag.find_element(By.CLASS_NAME, "tm-title__link")
        link_relative = article_link_tag.get_attribute("href")
        link_absolute = link_relative if link_relative.startswith("http") else f"https://habr.com{link_relative}"
        title = article_link_tag.text.strip()
    except Exception:
        link_absolute = None
        title = None
    if link_absolute:
        browser.execute_script("window.open(arguments[0]);", link_absolute)
        browser.switch_to.window(browser.window_handles[-1])
        try:
            wait_element(browser, 10, By.ID, "post-content-body")
            article_body_tag = browser.find_element(By.ID, "post-content-body")
            article_body_text = article_body_tag.text.strip()[:100]
        except Exception:
            article_body_text = None
        try:
            presenter_header_tag = browser.find_element(By.CLASS_NAME, "tm-article-presenter__header")
            views_tag = presenter_header_tag.find_element(By.CLASS_NAME, "tm-icon-counter__value")
            views = views_tag.text.strip()
        except Exception:
            views = None
        browser.close()
        browser.switch_to.window(browser.window_handles[0])
    else:
        article_body_text = None
        views = None
    articles_data.append({
        "user_name": user_name,
        'datetime': date_time,
        "Link": link_absolute,
        'title': title,
        'text': article_body_text,
        "views": views 
    })

print("Данные:", articles_data)

