from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta ():
        model = Post
        fields = ["id", "text", "pub_date", "is_draft", "author", "favorites_count"]
        read_only_fields = ["id", "pub_date", "author", "favorites_count"]

        def validate_is_draft(self, value: bool) -> bool:
            view = self.context["view"]
            if view.action == "create" and value is True:
                return value
            post = view.get_object()
            if not post.is_draft and value is True:
                raise ValidationError("Post is not draft")
            
            return value

        def validate(self, attrs: dict) -> dict:
            view = self.context["view"]

            if view.action == "create":
                return attrs

            post = view.get_object()
            if not post.is_draft:
                raise ValidationError("Post is not draft")
            
            return attrs