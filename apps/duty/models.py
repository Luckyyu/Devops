from django.db import models

# Create your models here.

class Duty_List(models.Model):
    title = models.CharField(max_length=50)
    start = models.CharField(max_length=50)
    order = models.IntegerField()
    class Meta:
        db_table = 'devops_duty'
        verbose_name = '机房值班'
        verbose_name_plural = "每月机房值班表"
