from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow any access to retrieve, but write access only to admin
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
