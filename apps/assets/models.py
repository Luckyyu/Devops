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

class Idel_Assets(models.Model):
    idc_name =models.ForeignKey(IDC_Assets,related_name="idel_assets",on_delete=models.CASCADE)
    idle_name = models.CharField(max_length=128,blank=True,null=True,default='',verbose_name='资产名称')
    idle_number = models.SmallIntegerField(default=10,verbose_name='剩余个数')
    idle_user = models.CharField(max_length=16,blank=True,null=True,default='',verbose_name='登记员')
    idle_desc = models.CharField(max_length=128,blank=True,null=True,default='',verbose_name='备注')
    update_time = models.DateTimeField(auto_now=True,blank=True,null=True,verbose_name='修改时间')
    class Meta:
        db_table = "devops_idel_assets"
        verbose_name = "闲置资产管理"
        verbose_name_plural = "机房闲置资产表"





