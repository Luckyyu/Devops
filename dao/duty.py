from duty.models import Duty_List

class DutyBase(object):
    def duty(self):
        return Duty_List.objects.all()