from aiohttp import web
from models import Base, User, Session, engine
import json
from sqlalchemy.ext.asyncio import AsyncSession
import bcrypt
from sqlalchemy.exc import IntegrityError

app = web.Application()

async def orm_context(app):
    print("START")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()
    print("FINISH")

app.cleanup_ctx.append(orm_context)

async def hello_world(request: web.Request):
    json_data = await request.json()
    qs = request.query
    headers = request.headers
    some_variable = int(request.match_info["some_variable"])
    print(json_data, qs, headers, some_variable)
    return web.json_response({"hello": "world"})

async def add_user(session, user):
    try:
        session.add(user)
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise get_http_error(web.HTTPConflict, f"User with name {user.name} already exists")

def hash_password(password):
    password = password.encode()
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed_password):
    password = password.encode()
    hashed_password = hashed_password.encode()
    return bcrypt.checkpw(password, hashed_password)

async def get_user_by_id(session, user_id):
    user = await session.get(User, user_id)
    if user is None:
        raise get_http_error(web.HTTPNotFound, "User not found")
    return user

def get_http_error(error_class, message):
    response = json.dumps({"error": message})
    return error_class(text=response, content_type='application/json')

class UserView(web.View):
    @property
    def user_id(self):
        return int(self.request.match_info["user_id"])

    @property
    def session(self) -> AsyncSession:
        return self.request.session

    async def get_user(self):
        return await get_user_by_id(self.session, self.user_id)
    
    async def get(self):
        user = await self.get_user()
        return web.json_response({
            "id": user.id,
            "name": user.name,
            "registration_time": int(user.registration_time.timestamp()),})
    
    async def post(self):
        json_data = await self.request.json()
        json_data["password"] = hash_password(json_data["password"])
        user = User(**json_data)
        await add_user(self.session, user)
        return web.json_response({"id": user.id})
    
    async def patch(self):
        json_data = await self.request.json()
        user = await self.get_user()
        
        if "password" in json_data:
            json_data["password"] = hash_password(json_data["password"])
        
        for field, value in json_data.items():
            setattr(user, field, value)
        
        try:
            await self.session.commit()
        except IntegrityError:
            await self.session.rollback()
            raise get_http_error(web.HTTPConflict, f"User update conflict")
        
        return web.json_response({"status": "updated", "id": user.id})
    
    async def delete(self):
        user = await self.get_user()
        await self.session.delete(user)
        await self.session.commit()
        return web.json_response({"status": "deleted"})

@web.middleware
async def session_middleware(request: web.Request, handler):
    async with Session() as session:
        request.session = session
        try:
            response = await handler(request)
            return response
        except Exception:
            await session.rollback()
            raise

app.middlewares.append(session_middleware)

app.add_routes([
    web.get("/user/{user_id:\\d+}", UserView),
    web.patch("/user/{user_id:\\d+}", UserView),
    web.post("/user/", UserView),
    web.delete("/user/{user_id:\\d+}", UserView),
    web.post('/hello/world/{some_variable:\\d+}', hello_world),
])

if __name__ == '__main__':
    web.run_app(app, host='127.0.0.1', port=9999)