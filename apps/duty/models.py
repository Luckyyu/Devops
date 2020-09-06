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

class Duty_Log(models.Model):
    title = models.CharField(max_length=70,verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    created_time = models.DateTimeField(auto_now_add=True,verbose_name='创建时间')
    class Meta:
        db_table = 'devops_duty'
        verbose_name = '机房值班'
        verbose_name_plural = "每月机房值班表"
