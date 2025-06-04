from django.db import models
from django.conf import settings
from crum import get_current_user

# -------------------------
# Auditoria
# -------------------------

class AuditoriaBase(models.Model):
    date_creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user_creation = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='created_%(class)s_set',
        null=True, blank=True,
        on_delete=models.SET_NULL
    )
    date_updated = models.DateTimeField(auto_now=True, null=True, blank=True)
    user_updated = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='updated_%(class)s_set',
        null=True, blank=True,
        on_delete=models.SET_NULL
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        user = get_current_user()
        if user and not user.pk:
            user = None

        if not self.pk:
            # Es una creación
            if user:
                self.user_creation = user
        else:
            # Es una actualización
            if user:
                self.user_updated = user

        super().save(*args, **kwargs)
