from django.db import models
from sorl.thumbnail import ImageField
from djangocms_text_ckeditor.fields import HTMLField


class Post(models.Model):
    title = models.CharField(max_length = 100)
    slug = models.SlugField()
    content = HTMLField()
    pub_date = models.DateTimeField('date published')
    longitude = models.CharField(max_length = 100, blank = True)
    latitude = models.CharField(max_length = 100, blank = True)
    hexcode = models.CharField(max_length = 7, blank = True)
    @models.permalink
    def get_absolute_url(self):
    	return ('post', [self.slug])
	def __unicode__(self):
		return self.title
	class Meta:
		ordering = ['-time']


class LargeImage(models.Model):
	post = models.ForeignKey(Post)
	image1 =  ImageField(upload_to='blogimages', verbose_name="Image 1 in a row (750 x 400)")
	def __unicode__(self):
		return self.image1

class MediumImage(models.Model):
	post = models.ForeignKey(Post)
	image2 =  ImageField(upload_to='blogimages', verbose_name="Image 2 in a row (350 x 250)")
	def __unicode__(self):
		return self.image2

class SmallImage(models.Model):
	post = models.ForeignKey(Post)
	image3 =  ImageField(upload_to='blogimages', verbose_name="Image 3 in a row (250 x 250)")
	def __unicode__(self):
		return self.image3

