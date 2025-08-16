import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from model_bakery import baker
from demo.models import Message

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create(username="test")

@pytest.fixture
def message_factory():
    def factory(*args, **kwargs):
        return baker.make(Message, *args, **kwargs)
    return factory

@pytest.mark.django_db

def get_messages(client, user, message_factory):
    # Arrange
    messages = message_factory(_quantity=10)

    # Act

    response = client.get("/messages/")

    # Assert
    
    assert response.status_code == 200
    
    data = response.json()

    assert len(data["results"]) == len(messages)

    for i, m in enumerate(data):
        assert m["text"] ==messages[i].text

@pytest.mark.django_db
def test_create_message(client, user):
    count = Message.objects.count()
    res = client.post("/messages/", data={"user": user.id, "text": "Test"}, format="json")
    res.json()

    assert res.status_code == 201 
    assert Message.objects.count() == count + 1