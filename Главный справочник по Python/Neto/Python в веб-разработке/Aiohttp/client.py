import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://127.0.0.1:9999/user/1', json={"name": "user_2", "password": "1234"}) as response:
            print(response.status)
            print(await response.text())

asyncio.run(main())