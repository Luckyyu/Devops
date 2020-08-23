from django.db import models

# Create your models here.


class Zone_Assets(models.Model):
    zone_name = models.CharField(max_length=100,unique=True)
    class Meta:
        db_table = 'devops_zone_assets'
        verbose_name = '资产管理'
        verbose_name_plural = '区域资产表'