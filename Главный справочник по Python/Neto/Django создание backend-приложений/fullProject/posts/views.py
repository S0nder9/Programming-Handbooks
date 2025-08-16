from rest_framework import viewsets
from posts.models import Post
from posts.permissions import IsAuthor
from posts.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthor]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        if instance.author == self.request.user:
            instance.delete()

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(models.Q(is_draft=False) | models.Q(author=self.request.user))
        return qs

    @action(http_method_names=['post'], detail=True, permission_classes=[IsAuthenticated], url_path='toggle-favorite')
    def toggle_favorite(self, request, *args, **kwargs):
        post = self.get_object()
        user = request.user

        if post.author == user:
            raise PermissionDenied("You can't favorite your own post")
        

        if post.favorite_by.filter(user=user).exists():
            post.favorite_by.remove(user)
            state = False
        else:
            post.favorite_by.add(user)
            state = True

        return Response(data ={"state": state}, status=status.HTTP_200_OK)
