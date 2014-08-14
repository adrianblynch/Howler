from django.db import models
from cms.models import CMSPlugin

class Slideshow(models.Model):
    parent = models.ForeignKey('self', blank=True, null=True)
    name = models.CharField(max_length=30)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('slideshow_view', args=[self.pk])

    class Meta:
        verbose_name_plural = 'slideshow'


class Picture(models.Model):
    slideshow = models.ForeignKey(Slideshow)
    image = models.ImageField(upload_to="static/uploads/")
    description = models.CharField(max_length=60)


class SlideshowPlugin(CMSPlugin):
    slideshow = models.ForeignKey(Slideshow)