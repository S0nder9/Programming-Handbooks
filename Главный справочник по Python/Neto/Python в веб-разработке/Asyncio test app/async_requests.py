import aiohttp
import asyncio
import datetime
from models import init_orm, Session, Swapi_people
from more_itertools import chunked

MAX_CHUNKS = 10

async def get_people(people_id, session):
        async with session.get(f"https://swapi.dev/api/people/{people_id}/", ssl=False) as response:
            json_data = await response.json()
            return json_data

async def save_to_db(person_data):
    async with Session() as session:
        orm_objects = [Swapi_people(json=people_json) for people_json in person_data]
        session.add_all(orm_objects)
        await session.commit()
    

async def main():
    await init_orm()
    async with aiohttp.ClientSession() as session:
        people_ids = chunked(range(1, 10), MAX_CHUNKS)
        for chunk in people_ids:
            coros = [get_people(people_id, session) for people_id in chunk]
            results = await asyncio.gather(*coros)
            asyncio.create_task(save_to_db(results))

        main_task = asyncio.current_task()
        current_task = asyncio.all_tasks()
        current_task.remove(main_task)
        await asyncio.gather(*current_task)
start = datetime.datetime.now()
asyncio.run(main())
end = datetime.datetime.now()
print(f"Time spent: {end - start}")