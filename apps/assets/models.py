from django.db import models

# Create your models here.


class Zone_Assets(models.Model):
    zone_name = models.CharField(max_length=100,unique=True)
    class Meta:
        db_table = 'devops_zone_assets'
        verbose_name = '资产管理'
        verbose_name_plural = '区域资产表'

class IDC_Assets(models.Model):
    zone = models.ForeignKey(Zone_Assets,related_name="idc_assets",on_delete=models.CASCADE)
    idc_name = models.CharField(max_length=32,verbose_name="机房名称")
    idc_bandwidth = models.CharField(max_length=32,null=True,blank=True,default='',verbose_name="机房带宽")
    idc_contact = models.CharField(max_length=16,null=True,blank=True,default='',verbose_name="机房联系人")
    idc_phone = models.CharField(max_length=32, blank=True, null=True, default='', verbose_name=u'联系电话')
    idc_network = models.TextField(blank=True, null=True, default='', verbose_name=u"IP地址段")
    idc_address = models.CharField(max_length=128, blank=True, null=True, default='', verbose_name=u"机房地址")
    idc_desc = models.CharField(max_length=128, blank=True, default='', null=True, verbose_name=u"备注")
    class Meta:
        db_table = "devops_idc_assets"
        verbose_name = "资产管理"
        verbose_name_plural = "机房资产表"



