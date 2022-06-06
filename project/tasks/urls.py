from rest_framework import routers
from .views import CategoryViewSet, DashboardTaskCompletionStatViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'categories')
router.register(r'api/tasks', TaskViewSet, 'tasks'),
router.register("api/dashboard/tasks-completion",
                DashboardTaskCompletionStatViewSet, "tasks-completion")

urlpatterns = router.urls
