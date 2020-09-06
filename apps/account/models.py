from django.db import models
from django.contrib.auth.models import AbstractUser, Permission
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=32, unique=True, verbose_name="角色")
    permissions = models.ManyToManyField(Permission, blank=True, verbose_name="角色权限")
    desc = models.CharField(max_length=50, blank=True, null=True, verbose_name="描述")
    class Meta:
        db_table = 'devops_role'
        verbose_name = '账户管理'
        verbose_name_plural = '角色信息'
        permissions = (
            ("account_read_role", "读取角色权限"),
            ("account_change_role", "更改角色权限"),
            ("account_add_role", "添加角色权限"),
            ("account_delete_role", "删除角色权限"),
        )


class Structure(MPTTModel):
    type_choices = (("unit", "单位"), ("department", "部门"))
    text = models.CharField(max_length=60, verbose_name="名称")
    desc = models.CharField(max_length=150, blank=True, null=True, verbose_name="描述")
    type = models.CharField(max_length=20, choices=type_choices, default="department", verbose_name="类型")
    parent = TreeForeignKey('self', on_delete=models.SET_NULL, verbose_name='上级业务', null=True, blank=True,db_index=True ,related_name='children')
    manage = models.SmallIntegerField(blank=True,null=True,verbose_name='负责人')
    mail_group = models.CharField(max_length=200, verbose_name="邮件群组地址", blank=True, null=True)
    wechat_webhook_url = models.TextField(verbose_name="企业微信群聊机器人WebHook", blank=True, null=True)
    dingding_webhook_url = models.TextField(verbose_name="钉钉群聊机器人WebHook", blank=True, null=True)
    class Meta:
        db_table = 'devops_structure'
        verbose_name = '账户管理'
        verbose_name_plural = '组织架构信息'


class User(AbstractUser):
    name = models.CharField(max_length=20, default="", verbose_name="中文名字")
    mobile = models.CharField(max_length=11, default="", verbose_name="手机号码",null=True, blank=True)
    email = models.EmailField(max_length=50, verbose_name="邮箱")
    department = models.ManyToManyField("Structure", blank=True, verbose_name="部门")
    post = models.CharField(max_length=50, null=True, blank=True, verbose_name="职位")
    superior = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL, verbose_name="上级主管")
    roles = models.ManyToManyField("Role", verbose_name="角色", blank=True)
    class Meta:
        db_table = 'devops_user'
        verbose_name = '账户管理'
        verbose_name_plural = '用户表'
