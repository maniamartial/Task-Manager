from asyncio import tasks
from logging import CRITICAL
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.


class Category(models.Model):
    class Meta:
        verbose_name_plural = "categories"
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name="categories",
                                   on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    class Priority(models.IntegerChoices):
        LOW = 1, "Low"
        MEDIUM = 2, "Medium"
        HIGH = 3, "High"
        CRITICAL = 4, "Criitical"

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    priority = models.PositiveSmallIntegerField(
        choices=Priority.choices, default=Priority.MEDIUM)
    category = models.ForeignKey(
        Category, related_name="tasks", on_delete=models.CASCADE)

    created_by = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
