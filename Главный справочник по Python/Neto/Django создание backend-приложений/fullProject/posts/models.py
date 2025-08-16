from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    favorite_by = models.ManyToManyField(User, related_name="favorite_posts", blank=True)
    is_draft = models.BooleanField(default=False)

    @property
    def favorites_count(self) -> int:
        self.favorite_by.count()