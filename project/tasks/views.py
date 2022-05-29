from django.shortcuts import render
from .serializers import CategorySerializer, TaskSerializer
from .models import Category, Task
from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination

# Create your views here.

# pagination


class StandardResultSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 6


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskviewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TaskSerializer
    pagination_class = StandardResultSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    ordering_fields = ['title']
    ordering = ['completed']

    def get_queryset(self):
        user = self.request.user
        completed = self.request.query_params.get('completed')
        priority = self.request.query_params.get('priority')
        category = self.request.query_params.get('category')
        query_params = {}

        if completed is not None:
            query_params['completed'] = completed

        if priority is not None:
            query_params['category'] = category

        if category is not None:
            query_params['priority'] = priority
        return Task.objects.filter(created_by=user, **query_params)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
