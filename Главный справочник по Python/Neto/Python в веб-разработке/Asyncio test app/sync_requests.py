import datetime
import requests

def get_people(person_id):
    response = requests.get(f"https://swapi.dev/api/people/{person_id}/", verify=False)
    response.raise_for_status()
    return response.json()

def main():
    response_1 = get_people(1)
    response_2 = get_people(1)
    response_3 = get_people(1)
    response_4 = get_people(1)
    response_5 = get_people(1)
    print( response_1 , response_2 , response_3 , response_4 , response_5)

start = datetime.datetime.now()
main()
end = datetime.datetime.now()
print(f"Time spent: {end - start}")
