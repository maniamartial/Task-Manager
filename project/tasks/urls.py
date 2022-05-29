from sys import prefix
from rest_framework import routers
from .views import CategoryViewSet, TaskviewSet

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'categories')
router.register(r"api/tasks", TaskviewSet, "tasks")

urlpatterns = router.urls
