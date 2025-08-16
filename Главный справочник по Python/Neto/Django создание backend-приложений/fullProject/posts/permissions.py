from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthor(BasePermission):
    def has_object_permission(self, request, obj): 
        return request.method in SAFE_METHODS or obj.author == request.user
        
