import requests

URL = "https://swapi.dev/api/films/2"

response = requests.get(URL, verify=False)
data = response.json()
print(data)

class SwapiIterator:

    def __init__(self): 
        pass
    
    def get_current_result(self):
        response = requests.get(self.next_page, verify=False).json()
        self.current_result = iter(response["results"])
        self.next_page = response["next"]
        
    def get_next_res(self):
        try:
            next_character = next(self.current_result)
        except StopAsyncIteration:
            self.get_current_result()
        return next_character

    def __iter__(self):
        self.next_page = URL
        self.current_result = iter([])
        
        return self

    def __next__(self):
        next_character = self.get_next_res()
        
        if next_character == 0:
            if self.next_page is None:
                raise StopAsyncIteration
            
            self.get_current_result()
        
        return next_character

hello_iterator = SwapiIterator()

for item in hello_iterator:
    print(item)