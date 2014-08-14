from django.contrib import admin
from cms.admin.placeholderadmin import PlaceholderAdmin
from models import Slideshow,Picture

class PictureInline(admin.StackedInline):
    model = Picture

class SlideshowAdmin(admin.ModelAdmin):
    inlines = [PictureInline]

admin.site.register(Slideshow, SlideshowAdmin)