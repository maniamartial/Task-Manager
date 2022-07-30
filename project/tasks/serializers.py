
from dataclasses import field, fields
from rest_framework import serializers
from django.shortcuts import render
from .models import Category, Task
#Srilaizer is like creating a form when you aren't using APIs

#Allow API to use the category data
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        #All other fields can be edited except the creator
        read_only_fields = ['created_by']

#Allow API to acces the task table through serializers
class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        read_only=True, source="category.name"
    )
    category_color = serializers.CharField(
        read_only=True, source="category.color")

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["created_by"]

#Access the data that is the completed
class DashboardTaskCompletionStatSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = Task
        fields = ("completed", "count")

# Allow API to access the category
class DashboardTaskCategorySerializer(serializers.ModelSerializer):
    count=serializers.IntegerField()

    class Meta:
        model=Category
        fields=('id', 'name', 'color', 'count')
